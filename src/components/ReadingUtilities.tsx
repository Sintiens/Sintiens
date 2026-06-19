import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Pause, Square, Loader2, Volume2 } from "lucide-react";
import type { TopicBlockData } from "../types/story";

interface ReadingUtilitiesProps {
  actId: string;
  actColor: string;
  blocks: TopicBlockData[];
  activeBlockId: string;
}

type TTSState = "idle" | "playing" | "paused" | "loading";

// ─── DOM helpers ─────────────────────────────────────────────────────────────

const getWordBoundaries = (text: string): { start: number; end: number }[] => {
  const out: { start: number; end: number }[] = [];
  const re = /[^\s\u00A0]+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    out.push({ start: m.index, end: m.index + m[0].length });
  }
  return out;
};

const buildSpeechData = (
  el: HTMLElement
): { text: string; textNodes: { node: Text; start: number; end: number }[] } => {
  const textNodes: { node: Text; start: number; end: number }[] = [];
  let text = "";
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => {
      const p = n.parentElement;
      if (!p) return NodeFilter.FILTER_REJECT;
      if (p.closest("button, svg, [aria-hidden='true']")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    const t = node.textContent || "";
    textNodes.push({ node, start: text.length, end: text.length + t.length });
    text += t;
  }
  return { text, textNodes };
};

/**
 * Binary-search: returns the index of the word that contains charIdx,
 * or the index of the word immediately before it (if in whitespace).
 */
function charToWordIdx(boundaries: { start: number; end: number }[], charIdx: number): number {
  if (!boundaries.length) return -1;
  let lo = 0, hi = boundaries.length - 1, found = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const b = boundaries[mid];
    if (charIdx < b.start) { hi = mid - 1; }
    else if (charIdx >= b.end) { lo = mid + 1; }
    else { found = mid; break; }
  }
  if (found < 0) found = hi >= 0 ? hi : 0;
  return Math.max(0, Math.min(found, boundaries.length - 1));
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReadingUtilities({
  actId,
  actColor,
  blocks,
  activeBlockId,
}: ReadingUtilitiesProps) {
  const [ttsState, setTtsState] = useState<TTSState>("idle");
  const [ttsSupported, setTtsSupported] = useState(false);

  // ── DOM state ─────────────────────────────────────────────────────────────
  const utteranceRef  = useRef<SpeechSynthesisUtterance | null>(null);
  const wordSpansRef  = useRef<(HTMLSpanElement | null)[]>([]);
  const boundariesRef = useRef<{ start: number; end: number }[]>([]);
  const textLenRef    = useRef(0);

  // Highlight window: prev / curr / next indices (-1 = none)
  const hlPrevRef = useRef(-1);
  const hlCurrRef = useRef(-1);
  const hlNextRef = useRef(-1);

  // ── RAF / state ───────────────────────────────────────────────────────────
  const rafIdRef    = useRef(0);
  const tickFnRef   = useRef<(() => void) | null>(null);
  const ttsStateRef = useRef<TTSState>("idle");

  // ── Timing ────────────────────────────────────────────────────────────────
  // speechStartRef & baselineCharRef define the anchor from which the RAF
  // estimates forward each frame. Re-anchored on every onboundary event.
  const speechStartRef  = useRef(0);
  const baselineCharRef = useRef(0);

  // Raw boundary data for calibrating the observed chars/sec rate.
  // Kept separate so that estimation doesn't corrupt calibration.
  const rawBdryCharRef = useRef(0);
  const rawBdryTimeRef = useRef(0);

  // Chars/sec rate estimate, calibrated from real inter-boundary timing.
  // Start at 18 ≈ 170wpm × 6.5chars/word — close to typical Spanish TTS.
  const observedRateRef = useRef(18);



  useEffect(() => {
    const ok = typeof window !== "undefined" && "speechSynthesis" in window;
    setTtsSupported(ok);
    if (ok) window.speechSynthesis.getVoices();
  }, []);

  const activeBlock = useMemo(
    () => blocks.find((b) => b.id === activeBlockId) || blocks[0],
    [blocks, activeBlockId]
  );

  const getBlockEl = useCallback((): HTMLElement | null => {
    if (!activeBlock) return null;
    return document.querySelector(`[data-block-id="${activeBlock.id}"]`) as HTMLElement | null;
  }, [activeBlock]);

  // ── Highlight helpers ─────────────────────────────────────────────────────

  const clearSpan = (idx: number) => {
    if (idx < 0) return;
    wordSpansRef.current[idx]?.classList.remove("tts-active", "tts-near");
  };

  /** Throttled scroll‑into‑view – avoids forced layout every frame. */
  const lastScrollCheckRef = useRef(0);
  const SCROLL_CHECK_MS = 300;

  /**
   * Highlight 3‑word window centred on the word at charIdx.
   * charIdx < 0 or >= textLen → clear all (fixes last‑word‑stuck bug).
   */
  const highlightByCharIdx = useCallback((charIdx: number) => {
    const boundaries = boundariesRef.current;
    const spans = wordSpansRef.current;
    if (!boundaries.length) return;

    if (charIdx < 0 || charIdx >= textLenRef.current) {
      clearSpan(hlPrevRef.current);
      clearSpan(hlCurrRef.current);
      clearSpan(hlNextRef.current);
      hlPrevRef.current = hlCurrRef.current = hlNextRef.current = -1;
      return;
    }

    const wordIdx = charToWordIdx(boundaries, charIdx);
    if (wordIdx === hlCurrRef.current) return;

    const prevIdx = wordIdx > 0 ? wordIdx - 1 : -1;
    const nextIdx = wordIdx < boundaries.length - 1 ? wordIdx + 1 : -1;

    const oldSet = new Set([hlPrevRef.current, hlCurrRef.current, hlNextRef.current]);
    const newSet = new Set([prevIdx, wordIdx, nextIdx]);

    // Smooth fade‑out for spans leaving the window (CSS transition handles it)
    oldSet.forEach((i) => { if (i >= 0 && !newSet.has(i)) clearSpan(i); });

    /**
     * Instant entry, smooth exit.
     * Transitions are disabled while the class is added so the background
     * appears in the next frame (16ms). When the class is later removed
     * (via clearSpan), the CSS transition fades it out gracefully.
     */
    const applyClassInstant = (i: number, cls: string) => {
      if (i < 0) return;
      const s = spans[i];
      if (!s || s.classList.contains(cls)) return;
      s.style.transition = "none";
      s.classList.remove("tts-active", "tts-near");
      s.classList.add(cls);
      void s.offsetHeight; // force reflow so the class takes effect at once
      s.style.transition = ""; // restore CSS transition for future removal
    };

    applyClassInstant(prevIdx, "tts-near");
    applyClassInstant(wordIdx, "tts-active");
    applyClassInstant(nextIdx, "tts-near");

    hlPrevRef.current = prevIdx;
    hlCurrRef.current = wordIdx;
    hlNextRef.current = nextIdx;

    // Scroll into view only periodically to avoid forced layout jank
    const now = performance.now();
    if (now - lastScrollCheckRef.current > SCROLL_CHECK_MS) {
      lastScrollCheckRef.current = now;
      const s = spans[wordIdx];
      if (s) {
        const r = s.getBoundingClientRect();
        if (r.top < 0 || r.bottom > window.innerHeight) {
          s.scrollIntoView?.({ block: "center", behavior: "smooth" });
        }
      }
    }
  }, []);

  // ── DOM wrap / unwrap ────────────────────────────────────────────────────

  const unwrapWords = useCallback(() => {
    clearSpan(hlPrevRef.current);
    clearSpan(hlCurrRef.current);
    clearSpan(hlNextRef.current);
    hlPrevRef.current = hlCurrRef.current = hlNextRef.current = -1;

    const spans = wordSpansRef.current;
    const parents = new Set<Node>();
    for (let i = spans.length - 1; i >= 0; i--) {
      const s = spans[i];
      if (s?.parentNode) {
        s.parentNode.replaceChild(document.createTextNode(s.textContent || ""), s);
        parents.add(s.parentNode);
      }
    }
    parents.forEach((n) => n.normalize());
    wordSpansRef.current = [];
    boundariesRef.current = [];
    textLenRef.current = 0;
  }, []);

  const wrapWords = useCallback(() => {
    unwrapWords();
    const blockEl = getBlockEl();
    if (!blockEl) return;

    const { text, textNodes } = buildSpeechData(blockEl);
    if (!text) return;

    textLenRef.current = text.length;
    const boundaries = getWordBoundaries(text);
    boundariesRef.current = boundaries;
    if (!boundaries.length) return;

    const newSpans: (HTMLSpanElement | null)[] = new Array(boundaries.length).fill(null);

    for (const tn of textNodes) {
      const wordsInNode: { b: { start: number; end: number }; i: number }[] = [];
      for (let i = 0; i < boundaries.length; i++) {
        if (newSpans[i]) continue;
        const b = boundaries[i];
        if (b.start >= tn.start && b.end <= tn.end) wordsInNode.push({ b, i });
      }
      if (!wordsInNode.length) continue;

      const nodeText = tn.node.textContent || "";
      const frag = document.createDocumentFragment();
      let cursor = 0;

      for (const { b, i } of wordsInNode) {
        const ls = b.start - tn.start;
        const le = b.end - tn.start;
        if (ls > cursor) frag.appendChild(document.createTextNode(nodeText.slice(cursor, ls)));
        const span = document.createElement("span");
        span.className = "tts-w";
        span.textContent = nodeText.slice(ls, le);
        frag.appendChild(span);
        newSpans[i] = span;
        cursor = le;
      }
      if (cursor < nodeText.length) frag.appendChild(document.createTextNode(nodeText.slice(cursor)));
      if (tn.node.parentNode) tn.node.parentNode.replaceChild(frag, tn.node);
    }

    wordSpansRef.current = newSpans;
  }, [getBlockEl, unwrapWords]);

  // ── TTS controls ─────────────────────────────────────────────────────────

  const stopTTS = useCallback(() => {
    ttsStateRef.current = "idle";
    if (rafIdRef.current) { cancelAnimationFrame(rafIdRef.current); rafIdRef.current = 0; }
    tickFnRef.current = null;
    unwrapWords();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
    setTtsState("idle");
  }, [unwrapWords]);

  useEffect(() => { ttsStateRef.current = ttsState; }, [ttsState]);

  const playTTS = useCallback(() => {
    if (!ttsSupported) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const blockEl = getBlockEl();
    if (!blockEl) return;

    stopTTS();

    const { text } = buildSpeechData(blockEl);
    if (!text) return;

    wrapWords();

    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = 1;

    // ─────────────────────────────────────────────────────────────────────────
    // SYNCHRONIZATION STRATEGY
    //
    // 1. CSS instant-entry: JS temporarily disables transition when adding
    //    tts-active/tts-near classes. The background appears in the next
    //    frame (16ms). Removal uses the CSS transition for a smooth 0.28s
    //    fade-out. No lag compensation needed.
    //
    // 2. Rate calibration: consecutive onboundary events measure the real
    //    chars/sec of the voice, updating observedRateRef with 50/50 blend.
    //
    // 3. RAF estimation: between boundaries, estimate the current position
    //    as baselineChar + elapsed × rate. Each onboundary re-anchors the
    //    timer, correcting any drift.
    //
    // 4. textLen guard: if estimation overshoots textLen, clear all
    //    highlights (fixes the last-word-stuck bug).
    // ─────────────────────────────────────────────────────────────────────────

    const makeTick = (): (() => void) => {
      const fn = () => {
        if (ttsStateRef.current !== "playing") { rafIdRef.current = 0; return; }
        const elapsed = (performance.now() - speechStartRef.current) / 1000;
        const rate = observedRateRef.current * (utteranceRef.current?.rate ?? 1);
        const estimated = baselineCharRef.current + Math.floor(elapsed * rate);
        // textLen guard: if we've run past the end, clear highlights
        highlightByCharIdx(estimated < textLenRef.current ? estimated : -1);
        rafIdRef.current = requestAnimationFrame(fn);
      };
      return fn;
    };

    u.onstart = () => {
      speechStartRef.current = performance.now();
      baselineCharRef.current = 0;
      rawBdryCharRef.current = 0;
      rawBdryTimeRef.current = 0;
      ttsStateRef.current = "playing";
      setTtsState("playing");
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      const tick = makeTick();
      tickFnRef.current = tick;
      rafIdRef.current = requestAnimationFrame(tick);
    };

    u.onend = () => { stopTTS(); };

    u.onerror = (e) => {
      if ((e as SpeechSynthesisErrorEvent).error === "interrupted") return;
      stopTTS();
    };

    u.onpause = () => {
      ttsStateRef.current = "paused";
      setTtsState("paused");
      if (rafIdRef.current) { cancelAnimationFrame(rafIdRef.current); rafIdRef.current = 0; }
    };

    u.onresume = () => {
      // Re-anchor from where the highlight currently is so paused time is excluded
      const currWordStart = boundariesRef.current[hlCurrRef.current]?.start ?? baselineCharRef.current;
      speechStartRef.current = performance.now();
      baselineCharRef.current = currWordStart;
      ttsStateRef.current = "playing";
      setTtsState("playing");
      if (!rafIdRef.current) {
        const tick = tickFnRef.current ?? makeTick();
        tickFnRef.current = tick;
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    u.onboundary = (evt) => {
      if (typeof evt.charIndex !== "number") return;
      if (evt.name && evt.name !== "word") return;
      const now = performance.now();
      const rawCharIdx = evt.charIndex;

      // Rate calibration from consecutive boundaries
      if (rawBdryTimeRef.current > 0) {
        const dt = (now - rawBdryTimeRef.current) / 1000;
        const dc = rawCharIdx - rawBdryCharRef.current;
        if (dt > 0 && dc > 0) {
          const measured = Math.min(35, Math.max(8, dc / dt));
          observedRateRef.current = observedRateRef.current * 0.5 + measured * 0.5;
        }
      }
      rawBdryCharRef.current = rawCharIdx;
      rawBdryTimeRef.current = now;

      // Re‑anchor the RAF timer to this exact position (no compensation needed
      // — the CSS instant‑entry trick eliminates visual latency).
      baselineCharRef.current = rawCharIdx;
      speechStartRef.current = now;

      // Immediate highlight snap at the exact word being spoken
      highlightByCharIdx(rawCharIdx);
    };

    utteranceRef.current = u;
    setTtsState("loading");
    ttsStateRef.current = "loading";

    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find((v) => v.lang.toLowerCase().startsWith("es"));
    if (esVoice) u.voice = esVoice;

    // Reset timing — RAF starts in onstart, not here
    baselineCharRef.current = 0;
    rawBdryCharRef.current = 0;
    rawBdryTimeRef.current = 0;
    observedRateRef.current = 18;
    tickFnRef.current = null;

    window.speechSynthesis.speak(u);
  }, [ttsSupported, getBlockEl, stopTTS, wrapWords, highlightByCharIdx]);

  const pauseTTS = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  };

  const resumeTTS = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  };

  useEffect(() => { return () => { stopTTS(); }; }, []);
  useEffect(() => { stopTTS(); }, [actId, activeBlockId]);

  const onPress = () => {
    if (!ttsSupported) return;
    if (ttsState === "idle") playTTS();
    else if (ttsState === "playing") pauseTTS();
    else if (ttsState === "paused") resumeTTS();
    else if (ttsState === "loading") stopTTS();
  };

  if (!ttsSupported) return null;

  const isPlaying = ttsState === "playing";
  const isLoading = ttsState === "loading";

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={onPress}
        disabled={!activeBlock}
        className={`inline-flex items-center gap-1.5 text-[11px] md:text-[13px] font-bold font-mono uppercase tracking-[0.15em] transition-colors duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed select-none ${
          isPlaying ? actColor : "text-zinc-400 hover:text-primary"
        }`}
        aria-label={isPlaying ? "Pausar narración" : "Reproducir narración del acto"}
      >
        {isLoading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-3.5 h-3.5" />
        ) : (
          <Volume2 className="w-3.5 h-3.5" />
        )}
        <span>{isPlaying ? "Pausar" : isLoading ? "…" : "Escuchar este acto"}</span>
      </button>
      {ttsState !== "idle" && (
        <button
          onClick={stopTTS}
          className="inline-flex items-center justify-center text-zinc-400/50 hover:text-zinc-400 transition-colors cursor-pointer"
          aria-label="Detener narración"
        >
          <Square className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
