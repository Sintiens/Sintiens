import React from "react";
import { GLOSSARY_UNIFIED, GlossaryEntry, GLOSSARY_BY_ID } from "../data/glossaryUnified";

export interface StoryTooltipItem {
  id: string;
  term: string;
  patterns: string[];
  definition: string;
  category?: string;
  url?: string;
  type?: "glossary" | "citation";
}

const STORY_CONTEXT_PATTERNS: { pattern: string; entryId: string }[] = [
  { pattern: "demostrado de forma irrefutable", entryId: "declaracion-cambridge" },
  { pattern: "¿pueden sufrir\\?", entryId: "bentham" },
  { pattern: "pueden sufrir", entryId: "bentham" },
  { pattern: "sesgo cultural profundo", entryId: "melanie-joy" },
  { pattern: "macrogranjas industriales", entryId: "ganaderia-industrial" },
  { pattern: "El coste de recursos es astronómico", entryId: "obra-meatonomics" },
  { pattern: "protecciones reales y fundamentales", entryId: "obra-zoopolis" },
  { pattern: "La invisibilidad y el lenguaje", entryId: "obra-comer-animales" },
  { pattern: "usan herramientas para resolver problemas", entryId: "jennifer-ackerman" },
  { pattern: "vida cognitiva y emocional deslumbrante", entryId: "frans-de-waal" },
  { pattern: "tejido real", entryId: "agricultura-celular" }
];

function buildStoryPatternList(): { pattern: string; entry: GlossaryEntry }[] {
  const list: { pattern: string; entry: GlossaryEntry }[] = [];
  GLOSSARY_UNIFIED.forEach((entry) => {
    entry.patterns.forEach((pat) => {
      list.push({ pattern: pat, entry });
    });
  });
  STORY_CONTEXT_PATTERNS.forEach(({ pattern, entryId }) => {
    const entry = GLOSSARY_BY_ID[entryId];
    if (entry) list.push({ pattern, entry });
  });
  list.sort((a, b) => b.pattern.length - a.pattern.length);
  return list;
}

const patternList = buildStoryPatternList();

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const escapedPatterns = patternList.map((p) => escapeRegExp(p.pattern)).join("|");
const glossaryRegex = new RegExp(
  `(?<=^|[^a-zA-ZáéíóúÁÉÍÓÚñÑ¿?])(${escapedPatterns})(?=$|[^a-zA-ZáéíóúÁÉÍÓÚñÑ¿?])`,
  "gi"
);

export function getStoryEntry(id: string): GlossaryEntry | undefined {
  return GLOSSARY_BY_ID[id];
}

export const STORY_TOOLTIPS_COMPAT: StoryTooltipItem[] = GLOSSARY_UNIFIED.map((e) => ({
  id: e.id,
  term: e.term,
  patterns: e.patterns,
  definition: e.shortDef,
  category: e.category,
  url: e.references?.[0]?.url,
  type: e.type === "cita" ? "citation" : "glossary"
}));

interface StoryTextRendererProps {
  content: React.ReactNode;
  activeNoteId: string | null;
  activeInstanceId?: string | null;
  onClickNote: (event: React.MouseEvent, noteId: string, item: GlossaryEntry, type: "glossary" | "citation", instanceId?: string) => void;
  accentColor?: string;
}

export default function StoryTextRenderer({
  content,
  activeNoteId,
  activeInstanceId,
  onClickNote,
  accentColor,
}: StoryTextRendererProps) {
  let termCount = 0;

  const processNode = (node: React.ReactNode, index: number = 0): React.ReactNode => {
    if (node === null || node === undefined) return null;

    if (typeof node === "string") {
      const glossaryParts = node.split(glossaryRegex);
      if (glossaryParts.length <= 1) {
        return <span key={`txt-${index}`}>{node}</span>;
      }

      return (
        <React.Fragment key={`frag-${index}`}>
          {glossaryParts.map((subPart, sIdx) => {
            if (sIdx % 2 !== 0) {
              const matchedText = subPart;
              const matchEntry = patternList.find(
                (p) =>
                  p.entry.patterns.some((pat) => {
                    const cleanedPat = pat.replace("\\?", "?");
                    return cleanedPat.toLowerCase() === matchedText.toLowerCase();
                  }) ||
                  STORY_CONTEXT_PATTERNS.some((scp) => {
                    const cleanedPat = scp.pattern.replace("\\?", "?");
                    return cleanedPat.toLowerCase() === matchedText.toLowerCase() && scp.entryId === p.entry.id;
                  })
              )?.entry;

              if (matchEntry) {
                termCount++;
                const instanceId = `${matchEntry.id}-${termCount}`;
                const isNoteActive = activeInstanceId
                  ? activeInstanceId === instanceId
                  : (activeNoteId === matchEntry.id && termCount === 1);

                const accent = accentColor || "primary";
                const cssVar = accent === "primary" ? "var(--primary)" : `var(--${accent})`;

                const highlighterStyle = isNoteActive
                  ? {
                      backgroundImage: `linear-gradient(to top, color-mix(in oklch, ${cssVar} var(--highlight-mix-active, 35%), transparent) 42%, transparent 42%)`,
                      backgroundSize: '100% 100%',
                      backgroundPosition: '0 0',
                    }
                  : {
                      backgroundImage: `linear-gradient(to top, color-mix(in oklch, ${cssVar} var(--highlight-mix-deco, 14%), transparent) 32%, transparent 32%)`,
                      backgroundSize: '100% 100%',
                      backgroundPosition: '0 0',
                    };

                const noteType: "glossary" | "citation" = matchEntry.type === "cita" ? "citation" : "glossary";

                return (
                  <span
                    key={`term-${sIdx}`}
                    data-note-id={matchEntry.id}
                    data-instance-id={instanceId}
                    onClick={(e) => onClickNote(e, matchEntry.id, matchEntry, noteType, instanceId)}
                    style={highlighterStyle}
                    className="cursor-pointer transition-all duration-300 select-text inline px-1 pb-[1px] mx-[1px] bg-no-repeat"
                  >
                    {matchedText}
                  </span>
                );
              }
            }

            return <span key={`subtxt-${sIdx}`}>{subPart}</span>;
          })}
        </React.Fragment>
      );
    }

    if (React.isValidElement(node)) {
      const children = (node.props as any).children;
      if (children !== undefined && children !== null) {
        const parsedChildren = React.Children.map(children, (child, cIdx) =>
          processNode(child, cIdx)
        );
        return React.cloneElement(node, { ...(node.props || {}) } as any, parsedChildren);
      }
    }

    if (Array.isArray(node)) {
      return node.map((child, cIdx) => processNode(child, cIdx));
    }

    return node;
  };

  return <>{processNode(content)}</>;
}
