import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Pause, Square, Loader2, Volume2, Sliders, Settings2, BugPlay } from "lucide-react";
import type { TopicBlockData } from "../types/story";

declare global {
  interface Window {
    _activeUtterance?: SpeechSynthesisUtterance | null;
    _activeUtterances?: SpeechSynthesisUtterance[] | null;
  }
}

interface ReadingUtilitiesProps {
  actId: string;
  actColor: string;
  blocks: TopicBlockData[];
  activeBlockId: string;
}

type TTSState = "idle" | "playing" | "paused" | "loading";

// ─── DOM helpers ─────────────────────────────────────────────────────────────

const BLOCK_TAGS = new Set([
  "P", "DIV", "LI", "H1", "H2", "H3", "H4", "H5", "H6", "BLOCKQUOTE", "PRE",
  "SECTION", "ARTICLE", "ASIDE", "NAV", "HEADER", "FOOTER", "FORM", "OL", "UL",
  "TABLE", "THEAD", "TBODY", "TR", "TH", "TD", "BR"
]);

const getWordBoundaries = (text: string): { start: number; end: number }[] => {
  const out: { start: number; end: number }[] = [];
  const re = /[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu;
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

  const IGNORED_SELECTOR = "button, svg, script, style, [aria-hidden='true']";

  const traverse = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      if (element !== el && (element.matches(IGNORED_SELECTOR) || element.closest(IGNORED_SELECTOR))) {
        return;
      }

      const isBlock = BLOCK_TAGS.has(element.tagName);
      if (isBlock && text.length > 0 && !/\s$/.test(text)) {
        text += " ";
      }

      for (let i = 0; i < element.childNodes.length; i++) {
        traverse(element.childNodes[i]);
      }

      if (isBlock && text.length > 0 && !/\s$/.test(text)) {
        text += " ";
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      const t = node.textContent || "";
      if (t.length > 0) {
        textNodes.push({
          node: node as Text,
          start: text.length,
          end: text.length + t.length,
        });
        text += t;
      }
    }
  };

  traverse(el);

  let finalText = text;
  if (finalText.endsWith(" ")) {
    finalText = finalText.slice(0, -1);
  }

  return { text: finalText, textNodes };
};

interface SentenceChunk {
  text: string;
  start: number;
  end: number;
}

const splitIntoSentences = (text: string): SentenceChunk[] => {
  const chunks: SentenceChunk[] = [];
  const sentenceEndRegex = /[.!?]+(?:\s+|$)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  
  const abbrevs = /\b(sr|sra|dr|dra|etc|ud|uds|av|gdor|gob|pág|pag|prof|prov|ee\.uu)\.$/i;

  while ((match = sentenceEndRegex.exec(text)) !== null) {
    const delimiterEnd = match.index + match[0].length;
    const candidate = text.slice(lastIndex, delimiterEnd);
    const trimmedCandidate = candidate.trim();
    if (abbrevs.test(trimmedCandidate)) {
      continue;
    }
    chunks.push({
      text: candidate,
      start: lastIndex,
      end: delimiterEnd
    });
    lastIndex = delimiterEnd;
  }
  
  if (lastIndex < text.length) {
    const remaining = text.slice(lastIndex);
    if (remaining.trim().length > 0) {
      chunks.push({
        text: remaining,
        start: lastIndex,
        end: text.length
      });
    }
  }
  return chunks;
};

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

  // ── Voices state ─────────────────────────────────────────────────────────
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sintiens-tts-voice") || "";
    }
    return "";
  });

  useEffect(() => {
    const ok = typeof window !== "undefined" && "speechSynthesis" in window;
    setTtsSupported(ok);
    if (!ok) return;

    const updateVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices.filter((v) => v.lang.toLowerCase().startsWith("es")));
    };
    
    updateVoices();
    window.speechSynthesis.addEventListener("voiceschanged", updateVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
  }, []);

  const activeVoice = useMemo(() => {
    if (voices.length === 0) return null;
    let voice = voices.find((v) => v.voiceURI === selectedVoiceURI);
    if (!voice) {
      voice = voices.find((v) => v.localService) || voices[0];
    }
    return voice;
  }, [voices, selectedVoiceURI]);

  useEffect(() => {
    if (typeof window !== "undefined" && activeVoice) {
      localStorage.setItem("sintiens-tts-voice", activeVoice.voiceURI);
    }
  }, [activeVoice]);

  // ── DOM state ─────────────────────────────────────────────────────────────
  const utteranceRef  = useRef<SpeechSynthesisUtterance | null>(null);
  const utterancesRef = useRef<SpeechSynthesisUtterance[]>([]);
  const chunksRef     = useRef<SentenceChunk[]>([]);
  const currentChunkIdxRef = useRef(0);
  const isWaitingForChunkStartRef = useRef(true);
  const wordSpansRef  = useRef<(HTMLSpanElement | null)[]>([]);
  const boundariesRef = useRef<{ start: number; end: number }[]>([]);
  const textLenRef    = useRef(0);

  const hlPrevRef = useRef(-1);
  const hlCurrRef = useRef(-1);
  const hlNextRef = useRef(-1);

  // ── RAF / state ───────────────────────────────────────────────────────────
  const rafIdRef    = useRef(0);
  const tickFnRef   = useRef<(() => void) | null>(null);
  const ttsStateRef = useRef<TTSState>("idle");

  // ── Timing ────────────────────────────────────────────────────────────────
  const rawBdryCharRef = useRef(0);
  const rawBdryTimeRef = useRef(0);
  const observedRateRef = useRef(14); // Start with a conservative 14 chars/sec estimate
  const speechStartRef = useRef(0);
  
  // Settings
  const [showSettings, setShowSettings] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  const [latencyOffset, setLatencyOffset] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sintiens-tts-latency-offset");
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val)) return val;
      }
    }
    return 0; // Default to 0ms
  });
  const latencyOffsetRef = useRef(latencyOffset);
  useEffect(() => {
    latencyOffsetRef.current = latencyOffset;
    if (typeof window !== "undefined") localStorage.setItem("sintiens-tts-latency-offset", latencyOffset.toString());
  }, [latencyOffset]);

  const [speedRate, setSpeedRate] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sintiens-tts-speed-rate");
      if (saved) {
        const val = parseFloat(saved);
        if (!isNaN(val)) return val;
      }
    }
    return 1.0;
  });
  const speedRateRef = useRef(speedRate);
  useEffect(() => {
    speedRateRef.current = speedRate;
    if (typeof window !== "undefined") localStorage.setItem("sintiens-tts-speed-rate", speedRate.toString());
    utterancesRef.current.forEach((u) => { u.rate = speedRate; });
  }, [speedRate]);

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

  const lastScrollCheckRef = useRef(0);
  const SCROLL_CHECK_MS = 300;

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

    oldSet.forEach((i) => { if (i >= 0 && !newSet.has(i)) clearSpan(i); });

    const applyClassInstant = (i: number, cls: string) => {
      if (i < 0) return;
      const s = spans[i];
      if (!s || s.classList.contains(cls)) return;
      s.style.transition = "none";
      s.classList.remove("tts-active", "tts-near");
      s.classList.add(cls);
      void s.offsetHeight; 
      s.style.transition = "";
    };

    applyClassInstant(prevIdx, "tts-near");
    applyClassInstant(wordIdx, "tts-active");
    applyClassInstant(nextIdx, "tts-near");

    hlPrevRef.current = prevIdx;
    hlCurrRef.current = wordIdx;
    hlNextRef.current = nextIdx;

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
      window._activeUtterance = null;
      window._activeUtterances = null;
    }
    utteranceRef.current = null;
    utterancesRef.current = [];
    chunksRef.current = [];
    currentChunkIdxRef.current = 0;
    isWaitingForChunkStartRef.current = true;
    setTtsState("idle");
    
    // Clear debug UI
    const dbgEl = document.getElementById("tts-debug-overlay-text");
    if (dbgEl) dbgEl.textContent = "Stopped";
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

    setTtsState("loading");
    ttsStateRef.current = "loading";

    const chunks = splitIntoSentences(text);
    chunksRef.current = chunks;
    currentChunkIdxRef.current = 0;
    isWaitingForChunkStartRef.current = true;

    // Use activeVoice selected by user
    const selectedVoice = activeVoice;
    const isCloudVoice = selectedVoice ? !selectedVoice.localService : false;

    const makeTick = (): (() => void) => {
      const fn = () => {
        if (ttsStateRef.current !== "playing") { rafIdRef.current = 0; return; }
        
        const currentIdx = currentChunkIdxRef.current;
        const currentChunk = chunksRef.current[currentIdx];
        
        let estimated = 0;
        
        if (isWaitingForChunkStartRef.current) {
          const nextChunk = chunksRef.current[currentIdx + 1];
          estimated = nextChunk ? nextChunk.start : (currentChunk ? currentChunk.end - 1 : 0);
        } else {
          const elapsedSinceBoundary = (performance.now() - rawBdryTimeRef.current) / 1000;
          const rate = observedRateRef.current * speedRateRef.current;
          const latencySec = latencyOffsetRef.current / 1000;
          
          estimated = rawBdryCharRef.current + (elapsedSinceBoundary + latencySec) * rate;
          
          // Cap the estimated character index to the end of the current chunk.
          // This ensures that even if the voice is slow or onboundary is missing,
          // the highlight won't jump into the next sentence prematurely.
          if (currentChunk && estimated >= currentChunk.end) {
            estimated = currentChunk.end - 1;
          }
        }

        const clamped = Math.min(textLenRef.current - 1, Math.max(0, Math.floor(estimated)));
        highlightByCharIdx(clamped);

        const dbgEl = document.getElementById("tts-debug-overlay-text");
        if (dbgEl && showDebug) {
           dbgEl.textContent = `Idx: ${rawBdryCharRef.current} | Est: ${estimated.toFixed(0)} | Clp: ${clamped} | Chunk: ${currentIdx}/${chunks.length}`;
        }

        rafIdRef.current = requestAnimationFrame(fn);
      };
      return fn;
    };

    chunks.forEach((chunk, idx) => {
      const u = new SpeechSynthesisUtterance(chunk.text);
      u.lang = "es-ES";
      u.rate = speedRateRef.current;
      if (selectedVoice) {
        u.voice = selectedVoice;
      }

      u.onstart = () => {
        if (ttsStateRef.current !== "playing" && ttsStateRef.current !== "loading") return;
        setTtsState("playing");
        ttsStateRef.current = "playing";

        currentChunkIdxRef.current = idx;
        isWaitingForChunkStartRef.current = false;
        
        rawBdryCharRef.current = chunk.start;
        rawBdryTimeRef.current = performance.now();
        speechStartRef.current = performance.now();

        if (idx === 0) {
          if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
          const tick = makeTick();
          tickFnRef.current = tick;
          rafIdRef.current = requestAnimationFrame(tick);
        }
      };

      u.onend = () => {
        isWaitingForChunkStartRef.current = true;
        
        // Calibrate actual speed for voices that don't fire onboundary
        const duration = (performance.now() - speechStartRef.current) / 1000;
        if (duration > 0.5 && chunk.text.length > 0) {
          const measuredBase = (chunk.text.length / duration) / speedRateRef.current;
          // Slowly adapt the observed rate (low-pass filter) bounded between 8 and 30 chars/sec
          observedRateRef.current = observedRateRef.current * 0.7 + Math.min(30, Math.max(8, measuredBase)) * 0.3;
        }

        if (idx === chunks.length - 1) {
          stopTTS();
        }
      };

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
        
        // Update the EXACT known character index
        rawBdryCharRef.current = chunk.start + evt.charIndex;
        rawBdryTimeRef.current = performance.now();
        
        const dbgBdryEl = document.getElementById("tts-debug-boundary-text");
        if (dbgBdryEl && showDebug) {
           dbgBdryEl.textContent = `Event: ${evt.name} @ ${evt.charIndex}`;
        }
      };

      utterancesRef.current.push(u);
    });

    if (typeof window !== "undefined") {
      window._activeUtterances = utterancesRef.current;
    }

    utterancesRef.current.forEach((utterance) => {
      window.speechSynthesis.speak(utterance);
    });
  }, [ttsSupported, getBlockEl, stopTTS, wrapWords, activeVoice, showDebug]);

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

  useEffect(() => {
    if (ttsStateRef.current !== "playing" && ttsStateRef.current !== "paused") {
      stopTTS();
    }
  }, [activeBlockId]);

  useEffect(() => {
    stopTTS();
  }, [actId]);

  const onPress = () => {
    if (!ttsSupported) return;
    if (ttsState === "idle") playTTS();
    else if (ttsState === "playing") pauseTTS();
    else if (ttsState === "paused") resumeTTS();
    else if (ttsState === "loading") stopTTS();
  };

  if (!ttsSupported) return null;
  
  // FUNCIÓN DESACTIVADA TEMPORALMENTE POR PETICIÓN DEL USUARIO
  return null;

  const isPlaying = ttsState === "playing";
  const isLoading = ttsState === "loading";
  const isCloudVoice = activeVoice && !activeVoice.localService;

  return (
    <div className="inline-flex items-center gap-2 relative">
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
        <>
          <button
            onClick={stopTTS}
            className="inline-flex items-center justify-center text-zinc-400/50 hover:text-zinc-400 transition-colors cursor-pointer"
            aria-label="Detener narración"
          >
            <Square className="w-3 h-3" />
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`inline-flex items-center justify-center text-zinc-400/50 hover:text-zinc-400 transition-colors cursor-pointer ml-1 p-0.5 rounded ${
              showSettings ? "bg-zinc-800/20 text-primary" : ""
            }`}
            title="Ajustes de narración"
            aria-label="Ajustes de narración"
          >
            <Sliders className="w-3 h-3" />
          </button>
        </>
      )}

      {showSettings && (
        <div className="absolute bottom-full mb-2 left-0 z-50 glass-enhance border border-outline-variant/35 bg-surface-container-low/95 dark:bg-zinc-900/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg flex flex-col gap-2 min-w-[260px]">
          
          <div className="flex flex-col gap-1 mb-2">
            <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Settings2 className="w-3 h-3" /> Voz de Narración
            </label>
            <select 
              value={selectedVoiceURI} 
              onChange={(e) => setSelectedVoiceURI(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 rounded p-1 outline-none focus:border-primary w-full"
            >
              {voices.map(v => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} {v.localService ? "(Local)" : "(Nube)"}
                </option>
              ))}
            </select>
            {isCloudVoice && (
              <div className="text-[9px] text-amber-400/90 leading-tight mt-1 bg-amber-900/20 p-1.5 rounded border border-amber-900/50">
                ⚠️ Las voces en la nube no permiten resaltado palabra-por-palabra. Elige una voz "(Local)" para sincronización perfecta.
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
            <span>Sincronización</span>
            <span className="font-mono text-primary font-bold">
              {latencyOffset >= 0 ? `+${latencyOffset}` : latencyOffset}ms
            </span>
          </div>
          <input
            type="range"
            min="-300"
            max="500"
            step="25"
            value={latencyOffset}
            onChange={(e) => setLatencyOffset(parseInt(e.target.value, 10))}
            className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-primary"
            disabled={isCloudVoice}
            style={{ opacity: isCloudVoice ? 0.4 : 1 }}
          />

          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider mt-1.5 border-t border-zinc-800/40 pt-2">
            <span>Velocidad</span>
            <span className="font-mono text-primary font-bold">{speedRate.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min="0.75"
            max="1.75"
            step="0.05"
            value={speedRate}
            onChange={(e) => setSpeedRate(parseFloat(e.target.value))}
            className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />

          <div className="flex justify-between mt-1 border-t border-zinc-800/20 pt-2 items-center">
            <button
              onClick={() => setShowDebug(!showDebug)}
              className={`text-[9px] font-mono uppercase tracking-wider font-bold cursor-pointer flex items-center gap-1 ${showDebug ? "text-primary" : "text-zinc-500 hover:text-zinc-400"}`}
              title="Mostrar datos de sincronización"
            >
              <BugPlay className="w-3 h-3" /> Debug
            </button>
            <div className="flex gap-3">
                <button
                onClick={() => { setLatencyOffset(0); setSpeedRate(1.0); }}
                className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 hover:text-primary font-bold cursor-pointer"
                >
                Reiniciar
                </button>
                <button
                onClick={() => setShowSettings(false)}
                className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 hover:text-primary font-bold cursor-pointer"
                >
                Cerrar
                </button>
            </div>
          </div>
        </div>
      )}

      {showDebug && (
         <div className="fixed bottom-4 right-4 z-50 bg-black/80 border border-primary/50 p-2 rounded text-[10px] font-mono text-green-400 flex flex-col gap-1 pointer-events-none">
            <div className="font-bold text-white border-b border-white/20 pb-1 mb-1">TTS Sync Debug</div>
            <div>Voice: {activeVoice?.name || "None"}</div>
            <div>Local: {activeVoice?.localService ? "YES" : "NO"}</div>
            <div id="tts-debug-boundary-text">Event: None</div>
            <div id="tts-debug-overlay-text">Stopped</div>
         </div>
      )}
    </div>
  );
}
