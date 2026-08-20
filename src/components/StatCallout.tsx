import React from "react";
import type { StatCalloutData } from "../types/story";

const getAccentVar = (accent: string) =>
  accent === "primary" ? "var(--primary)" : `var(--${accent})`;

const StatCallouts: React.FC<{ items: StatCalloutData[]; accent: string }> = ({ items, accent }) => {
  if (!items || items.length === 0) return null;
  const cssVar = getAccentVar(accent);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4">
      {items.map((s, i) => (
        <div
          key={`${s.value}-${i}`}
          className="relative rounded-xl px-4 py-3.5 border overflow-hidden"
          style={{
            borderColor: `color-mix(in oklch, ${cssVar} 26%, transparent)`,
            background: `color-mix(in oklch, ${cssVar} 6%, transparent)`,
          }}
        >
          <div
            className="font-serif font-bold leading-none tracking-tight"
            style={{ color: cssVar, fontSize: "clamp(22px, 3vw, 30px)" }}
          >
            {s.value}
          </div>
          <div className="text-[11px] md:text-[12px] font-sans text-on-surface-variant/85 leading-snug mt-2">
            {s.label}
          </div>
          {s.detail && (
            <div className="text-[10px] font-sans font-light text-on-surface-variant/60 leading-snug mt-1">
              {s.detail}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatCallouts;
