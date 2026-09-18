import React from 'react';
import { BranchNode } from '../types/story';
import { Lightbulb, Link2, Bookmark } from 'lucide-react';

const ACCENT_STYLES: Record<string, { chip: string; line: string; dot: string }> = {
  ch1: { chip: "bg-ch1/10 border border-ch1/20", line: "border-ch1/30", dot: "bg-ch1/40" },
  ch2: { chip: "bg-ch2/10 border border-ch2/20", line: "border-ch2/30", dot: "bg-ch2/40" },
  ch3: { chip: "bg-ch3/10 border border-ch3/20", line: "border-ch3/30", dot: "bg-ch3/40" },
  ch4: { chip: "bg-ch4/10 border border-ch4/20", line: "border-ch4/30", dot: "bg-ch4/40" },
  ch5: { chip: "bg-ch5/10 border border-ch5/20", line: "border-ch5/30", dot: "bg-ch5/40" },
  ch6: { chip: "bg-ch6/10 border border-ch6/20", line: "border-ch6/30", dot: "bg-ch6/40" },
};

export const DeepDiveCard: React.FC<{ node: BranchNode; colorClass: string }> = ({ node, colorClass }) => {
  const extractedColor = colorClass.replace('text-', '');
  const accent = ACCENT_STYLES[extractedColor] ?? ACCENT_STYLES.ch1!;
  const IconComponent = node.category === 'Ejemplos'
    ? Lightbulb
    : node.category === 'Relaciones'
      ? Link2
      : Bookmark;

  return (
    <div className="p-6 md:p-8 rounded-2xl border border-outline-variant/20 bg-surface/50 shadow-sm w-full">
      <div className="flex items-center gap-3 mb-4">
        {node.category && (
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${accent.chip} ${colorClass}`}>
            <IconComponent className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
      <h3 className="font-serif text-[24px] md:text-[28px] font-medium text-on-surface mb-4 leading-tight tracking-tight">
        {node.label}
      </h3>
      {node.shortDesc && (
        <p className={`font-mono text-[11px] uppercase tracking-widest ${colorClass} mb-6 opacity-90`}>
          [ {node.shortDesc} ]
        </p>
      )}
      <div className="font-sans text-[16.5px] md:text-[18px] leading-relaxed text-on-surface/90 font-normal space-y-4">
        {node.content}
      </div>

      {node.children && node.children.length > 0 && (
        <div className={`mt-8 space-y-6 pl-5 md:pl-6 border-l ${accent.line}`}>
          {node.children.map(child => (
            <div key={child.id} className="relative">
              <div className={`absolute -left-[25px] md:-left-[29px] top-2.5 w-2 h-2 rounded-full ${accent.dot}`} />
              <h4 className="font-serif text-[18px] md:text-[20px] font-medium text-on-surface mb-2">
                {child.label}
              </h4>
              {child.shortDesc && (
                <p className={`font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/50 mb-3`}>
                  {child.shortDesc}
                </p>
              )}
              <div className="font-sans text-[15.5px] leading-relaxed text-on-surface/80 font-normal space-y-3">
                {child.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
