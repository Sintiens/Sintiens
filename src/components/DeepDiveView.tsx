import React from 'react';
import { motion } from 'motion/react';
import { DeepDiveData, BranchNode } from '../types/story';
import { X, ArrowRight, Lightbulb, Link2, Bookmark } from 'lucide-react';

interface DeepDiveViewProps {
  actId: string;
  actNum: string;
  actColor: string;
  data: DeepDiveData;
  onClose: () => void;
}

export const DeepDiveCard: React.FC<{ node: BranchNode; colorClass: string }> = ({ node, colorClass }) => {
  const extractedColor = colorClass.replace('text-', '');
  const IconComponent = node.category === 'Ejemplos' 
    ? Lightbulb 
    : node.category === 'Relaciones' 
      ? Link2 
      : Bookmark;

  return (
    <div className="p-6 md:p-8 rounded-2xl border border-outline-variant/20 bg-surface/50 shadow-sm w-full">
      <div className="flex items-center gap-3 mb-4">
        {node.category && (
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center bg-${extractedColor}/10 border border-${extractedColor}/20 ${colorClass}`}>
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
        <div className={`mt-8 space-y-6 pl-5 md:pl-6 border-l border-${extractedColor}/30`}>
          {node.children.map(child => (
            <div key={child.id} className="relative">
              <div className={`absolute -left-[25px] md:-left-[29px] top-2.5 w-2 h-2 rounded-full bg-${extractedColor}/40`} />
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

export default function DeepDiveView({ actId, actNum, actColor, data, onClose }: DeepDiveViewProps) {
  // To ensure the component adapts properly to the light/dark mode but retains the clean look
  // as per the screenshots.
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex justify-center bg-background/95 backdrop-blur-sm overflow-y-auto"
    >
      <div className="w-full max-w-7xl min-h-screen flex flex-col lg:flex-row relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 lg:fixed lg:top-8 lg:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-surface-variant/30 hover:bg-surface-variant text-on-surface transition-colors z-50"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Column: Context */}
        <div className="w-full lg:w-1/3 lg:min-h-screen p-8 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-outline-variant/20 sticky lg:top-0">
          <span className={`text-[11px] font-mono font-bold ${actColor} uppercase tracking-widest block leading-none mb-4`}>
            [ ACTO {actNum} ]
          </span>
          <h2 className="text-[clamp(32px,4vw,48px)] font-bold tracking-tight font-heading leading-tight mb-6 text-on-background">
            Archivo de Profundización
          </h2>
          <p className="font-serif italic text-[18px] text-on-surface-variant/70 leading-relaxed">
            Explorando los matices y conceptos técnicos detrás de <strong>{data.label}</strong>.
          </p>
        </div>

        {/* Right Column: Content Nodes */}
        <div className="w-full lg:w-2/3 px-3 py-6 md:p-8 lg:p-16 overflow-y-auto">
          <div className="space-y-8 max-w-3xl">
            {data.nodes.map(node => (
              <DeepDiveCard key={node.id} node={node} colorClass={actColor} />
            ))}
          </div>
          
          <div className="mt-16 flex justify-center pb-16">
             <button 
                onClick={onClose}
                className="px-8 py-3 rounded-full border border-outline-variant hover:bg-surface-variant text-on-surface transition-colors font-sans text-sm tracking-wide"
              >
                Cerrar y volver al Modo Lectura
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
