import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActData } from '../data/storyData';
import { Button } from './ui/Button';
import { BranchNode, TopicBlockData } from '../types/story';
import { ArrowLeft, ArrowRight, Clock, Bookmark, Lightbulb, Link2 } from 'lucide-react';
import GraphWidget from './GraphWidget';

interface DeepDiveViewProps {
  act: ActData;
  block: TopicBlockData;
  onBlockChange?: (index: number) => void;
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
    <div className={`p-6 md:p-8 rounded-[1.5rem] border border-outline-variant/20 bg-surface/50 shadow-sm w-full`}>
      <div className="flex items-center gap-3 mb-4">
        {node.category && node.category !== 'Pilares' && (
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center bg-${extractedColor}/10 border border-${extractedColor}/20 ${colorClass}`}>
            <IconComponent className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
      <h3 className={`font-serif text-[26px] md:text-[34px] font-medium text-on-surface mb-4 leading-[1.15] tracking-tight`}>
        {node.label}
      </h3>
      {node.shortDesc && (
        <p className={`font-mono text-[12px] uppercase tracking-widest ${colorClass} mb-6 opacity-90`}>
          [ {node.shortDesc} ]
        </p>
      )}
      <div className="font-sans text-[16px] md:text-[18px] leading-[1.7] text-on-surface-variant font-light space-y-4">
        {node.content}
      </div>

      {node.children && node.children.length > 0 && (
        <div className={`mt-8 space-y-8 pl-5 md:pl-6 border-l border-${extractedColor}/30`}>
          {node.children.map(child => {
            const ChildIcon = child.category === 'Ejemplos' ? Lightbulb : child.category === 'Relaciones' ? Link2 : Bookmark;
            return (
              <div key={child.id} className="relative">
                <h4 className={`font-serif text-[20px] md:text-[24px] font-medium text-on-surface mb-2 leading-tight flex items-center gap-2`}>
                  <ChildIcon className={`w-4 h-4 text-${extractedColor} opacity-70`} />
                  {child.label}
                </h4>
                {child.shortDesc && (
                  <p className={`font-mono text-[10px] uppercase tracking-widest ${colorClass} mb-3 opacity-80`}>[ {child.shortDesc} ]</p>
                )}
                <div className="font-sans text-[15px] md:text-[16px] leading-[1.7] text-on-surface-variant/90 font-light space-y-3">
                  {child.content}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } }
};

export default function DeepDiveView({ act, block, onBlockChange, onClose }: DeepDiveViewProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { pilares, ejemplos, relaciones } = useMemo(() => {
    const groups: { pilares: BranchNode[]; ejemplos: BranchNode[]; relaciones: BranchNode[] } = {
      pilares: [], ejemplos: [], relaciones: []
    };
    if (!block.treeData) return groups;
    
    block.treeData.forEach(node => {
      const cat = node.category || '';
      if (cat === 'Pilares') groups.pilares.push(node);
      else if (cat === 'Ejemplos') groups.ejemplos.push(node);
      else if (cat === 'Relaciones') groups.relaciones.push(node);
      else groups.pilares.push(node);
    });
    return groups;
  }, [block.treeData]);

  if (!block.treeData || block.treeData.length === 0) {
    return (
      <div className="p-8 text-center text-on-surface-variant flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4 font-serif italic text-base">No hay evidencia extendida para esta sección.</p>
        <Button onClick={onClose} variant="outline" className={`border-${act.textColor.replace('text-', '')}/30 ${act.textColor}`}>
          Volver al relato
        </Button>
      </div>
    );
  }

  const extractedColor = act.colorName.replace('bg-', '');
  const activeNode = selectedNodeId ? block.treeData.find(n => n.id === selectedNodeId) : null;

  // Renderizador de tarjetas minimalistas
  const renderCard = (node: BranchNode, isUnderDevelopment: boolean) => {
    const IconComponent = node.category === 'Ejemplos' 
      ? Lightbulb 
      : node.category === 'Relaciones' 
        ? Link2 
        : Bookmark;

    const isSelected = selectedNodeId === node.id;

    return (
      <motion.button
        key={node.id}
        variants={itemVariants}
        onClick={() => !isUnderDevelopment && setSelectedNodeId(node.id)}
        className={`group text-left p-4 md:p-5 rounded-xl border border-outline-variant/15 bg-surface/30 hover:bg-surface/80 transition-all duration-300 flex flex-col h-full overflow-hidden relative shadow-sm ${
          isUnderDevelopment ? 'opacity-65 cursor-default hover:bg-surface/30 hover:border-outline-variant/15 hover:shadow-sm' : 'hover:shadow-md hover:border-' + extractedColor + '/30 hover:-translate-y-0.5'
        }`}
      >
        {isSelected && (
          <motion.div layoutId="active-card-bg" className={`absolute inset-0 bg-${extractedColor}/5 border-2 border-${extractedColor}/40 rounded-xl z-0`} />
        )}

        {isUnderDevelopment && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-1.5 py-0.5 bg-outline-variant/10 rounded font-mono text-[8px] uppercase tracking-widest text-on-surface-variant/70">
            <Clock className="w-2 h-2" /> Dev
          </div>
        )}

        <div className="relative z-10 flex flex-col h-full w-full">
          {node.category !== 'Pilares' && (
            <div className={`mb-3 w-7 h-7 rounded-lg flex items-center justify-center bg-${extractedColor}/10 text-${extractedColor} border border-${extractedColor}/20`}>
              <IconComponent className="w-3.5 h-3.5" />
            </div>
          )}

          <h3 className={`font-serif text-[16px] md:text-[18px] font-medium text-on-surface leading-[1.25] mb-2 group-hover:${act.textColor} transition-colors duration-300 pr-8`}>
            {node.label}
          </h3>
          
          {node.shortDesc && (
            <p className={`font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/60 group-hover:${act.textColor} transition-colors duration-300 mb-2`}>
              [ {node.shortDesc} ]
            </p>
          )}

          {!isUnderDevelopment && (
            <div className={`absolute bottom-0 right-0 w-7 h-7 flex items-center justify-center rounded-full bg-${extractedColor}/10 text-${extractedColor} opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out`}>
              <ArrowRight className="w-3 h-3" />
            </div>
          )}
        </div>
      </motion.button>
    );
  };

  return (
    <div className="w-full min-h-screen bg-background relative flex flex-col px-1 sm:px-2 md:px-4">
      
      {/* NAVBAR: Solo se muestra en el modo Grid */}
      {!selectedNodeId && (
        <div className="py-2 px-2 w-full flex justify-between items-center bg-transparent">
          <button 
            onClick={onClose}
            className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-on-surface-variant hover:${act.textColor} transition-colors duration-300 px-4 py-2 rounded-full hover:bg-surface/50`}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al relato
          </button>
        </div>
      )}

      {/* NAVBAR STICKY: Solo para Focus Mode */}
      <AnimatePresence>
        {selectedNodeId && isScrolled && activeNode && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 py-3 px-6 w-full flex items-center gap-4 backdrop-blur-xl bg-background/85 border-b border-outline-variant/10 shadow-sm"
          >
            <button 
              onClick={() => setSelectedNodeId(null)}
              className={`shrink-0 p-2 rounded-full border border-outline-variant/30 hover:border-${extractedColor}/50 hover:bg-${extractedColor}/10 transition-colors text-on-surface-variant hover:${act.textColor}`}
            >
               <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-serif text-[16px] text-on-surface truncate">
              {activeNode.label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full flex-1 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!selectedNodeId ? (
            /* ========================================= */
            /* MODO 1: DASHBOARD SPLIT-BENTO COMPACTO    */
            /* ========================================= */
            <motion.div 
              key="grid-mode"
              initial={{ opacity: 0, filter: 'blur(5px)', scale: 0.99 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(5px)', scale: 0.99 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[1600px] px-2 md:px-4 pb-20"
            >
              {/* Headers */}
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6 pb-4 border-b border-outline-variant/10">
                <h1 className="font-serif text-[24px] md:text-[32px] leading-[1.15] font-semibold text-on-surface tracking-tight">
                  {block.title}
                </h1>
              </div>

              {/* SPLIT BENTO LAYOUT */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
                
                {/* LADO IZQUIERDO: GRAFO + CARD GRID (65%) */}
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="xl:col-span-8 flex flex-col gap-6">
                  
                  {/* WIDGET INTERACTIVO DEL GRAFO */}
                  <div className="w-full">
                    <GraphWidget 
                      act={act} 
                      block={block} 
                      onNodeSelect={(id) => setSelectedNodeId(id)} 
                      activeNodeId={selectedNodeId} 
                      onBlockSelect={onBlockChange}
                      onGoBack={onClose}
                    />
                  </div>

                  {/* CARDS ACTIVAS (Pilares) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {pilares.map((node) => renderCard(node, false))}
                  </div>
                </motion.div>

                {/* LADO DERECHO: EJEMPLOS Y RELACIONES MEZCLADOS (35%) */}
                <div className="xl:col-span-4 flex flex-col gap-4">
                  <motion.div 
                    variants={containerVariants} 
                    initial="hidden" 
                    animate="visible"
                    className="flex flex-col gap-8"
                  >
                    {ejemplos.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <h3 className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant mb-3 pl-2 opacity-60">Ejemplos Prácticos</h3>
                        <div className="grid grid-cols-1 gap-3">
                          {ejemplos.map((node) => renderCard(node, false))}
                        </div>
                      </div>
                    )}
                    {relaciones.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <h3 className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant mb-3 pl-2 opacity-60">Relaciones</h3>
                        <div className="grid grid-cols-1 gap-3">
                          {relaciones.map((node) => renderCard(node, true))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ========================================= */
            /* MODO 2: MODO LECTURA (FOCUS)              */
            /* ========================================= */
            <motion.div 
              key="focus-mode"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[850px] mx-auto px-4 sm:px-6 pt-4 pb-32"
            >
              {/* Botón Volver al principio del texto */}
              <button 
                onClick={() => setSelectedNodeId(null)}
                className={`flex items-center gap-3 mb-8 font-mono text-[12px] uppercase tracking-widest text-on-surface-variant hover:${act.textColor} transition-colors duration-300 group`}
              >
                <div className={`p-1.5 rounded-full border border-outline-variant/30 group-hover:border-${extractedColor}/50 group-hover:bg-${extractedColor}/10 transition-colors`}>
                   <ArrowLeft className="w-3.5 h-3.5" />
                </div>
                Volver al Panel
              </button>
              
              {activeNode && (
                <DeepDiveCard node={activeNode} colorClass={act.textColor} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
