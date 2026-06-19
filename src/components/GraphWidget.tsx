import React, { useMemo, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ActData } from '../data/storyData';
import { TopicBlockData } from '../types/story';
import { Bookmark, Lightbulb, Link2 } from 'lucide-react';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

interface GraphWidgetProps {
  act: ActData;
  block: TopicBlockData;
  onNodeSelect: (id: string) => void;
  activeNodeId: string | null;
  onBlockSelect?: (index: number) => void;
  onGoBack: () => void;
}

export default function GraphWidget({ act, block, onNodeSelect, activeNodeId, onBlockSelect, onGoBack }: GraphWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<ReactZoomPanPinchRef>(null);

  const truncateLabel = (text: string, maxLength: number = 30) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getCategoryIcon = (category: string) => {
    if (category === 'Ejemplos') return <Lightbulb className="w-3.5 h-3.5 opacity-60" />;
    if (category === 'Relaciones') return <Link2 className="w-3.5 h-3.5 opacity-60" />;
    return <Bookmark className="w-3.5 h-3.5 opacity-60" />;
  };

  const getBlockShortTitle = (title: string) => {
    if (title.includes("vivir y sentir")) return "Sintiencia";
    if (title.includes("dolor consciente")) return "Dolor vs Reflejo";
    if (title.includes("vida interior")) return "Vida Interior";
    if (title.includes("sufrimiento como la única medida")) return "Medida del Sufrimiento";
    if (title.includes("Especismo")) return "El Especismo";
    if (title.includes("Bienestarismo frente a Abolicionismo")) return "Bienestar vs Abolición";
    if (title.includes("Paradoja de la carne")) return "Disonancia Cognitiva";
    if (title.includes("autoengaño mental")) return "Autoengaño Mental";
    if (title.includes("domesticación extrema")) return "Domesticación";
    if (title.includes("Ganadería Industrial")) return "Ganadería Industrial";
    if (title.includes("Más allá de la granja")) return "Otros Usos";
    if (title.includes("ineficiencia termodinámica")) return "Ineficiencia Termodinámica";
    if (title.includes("pérdida de espacio")) return "Deforestación";
    if (title.includes("huella hídrica")) return "Huella y Clima";
    if (title.includes("despertar legal")) return "Despertar Legal";
    if (title.includes("Habeas Corpus")) return "Habeas Corpus";
    if (title.includes("Revolución Tecnológica")) return "Revolución Tecnológica";
    return title;
  };

  const graphData = useMemo(() => {
    const colX_globalRoot = 15; // Conceptos y Principios Fundamentales
    const colX_act = 320;       // La Sintiencia
    const colX_block = 540;     // Bloques
    const colX_leaf = 820;      // Conceptos (Hojas)
    
    const rowHeight = 45;
    const blockSpacing = 100; // Increased spacing to clearly separate blocks
    
    let currentY = 80;
    
    const globalRootNode = { id: 'global_root', label: "Conceptos & Principios Fundamentales", x: colX_globalRoot, y: 0 };
    const actNode = { id: 'act_root', label: act.title, x: colX_act, y: 0 };
    
    const blocksNodes: any[] = [];
    const leafNodes: any[] = [];
    const paths: any[] = [];
    
    act.blocks.forEach((b, bIdx) => {
      const bId = `b_${act.id}_${bIdx}`;
      const isCurrentBlock = b.title === block.title;
      const bStartY = currentY;
      
      if (b.deepDive?.nodes) {
        b.deepDive.nodes.forEach(item => {
             const category = item.category || 'Pilares';
             leafNodes.push({ 
                 id: `${bId}_${item.id}`, 
                 originalId: item.id,
                 item, 
                 x: colX_leaf, 
                 y: currentY, 
                 parent: bId,
                 category,
                 isCurrentBlock
             });
             currentY += rowHeight;
        });
      }
      
      const bEndY = currentY > bStartY ? currentY - rowHeight : bStartY;
      const bY = bStartY + (bEndY - bStartY) / 2;
      
      blocksNodes.push({ 
          id: bId, 
          label: getBlockShortTitle(b.title),
          x: colX_block, 
          y: bY,
          isCurrentBlock,
          originalTitle: b.title
      });
      
      currentY += blockSpacing;
    });
    
    if (blocksNodes.length > 0) {
        actNode.y = (blocksNodes[0].y + blocksNodes[blocksNodes.length - 1].y) / 2;
        globalRootNode.y = actNode.y;
    } else {
        actNode.y = 100;
        globalRootNode.y = 100;
    }
    
    // Generación de Paths
    const globalOutX = colX_globalRoot + 270; 
    const actInX = colX_act;
    paths.push({
        id: `p_global_act`,
        d: `M ${globalOutX} ${globalRootNode.y} C ${globalOutX + 20} ${globalRootNode.y}, ${actInX - 20} ${actNode.y}, ${actInX} ${actNode.y}`,
        isCurrent: true,
        isBase: true
    });

    const actOutX = colX_act + 180;
    blocksNodes.forEach(b => {
        const bInX = colX_block;
        paths.push({
            id: `p_act_${b.id}`,
            d: `M ${actOutX} ${actNode.y} C ${actOutX + 40} ${actNode.y}, ${bInX - 40} ${b.y}, ${bInX} ${b.y}`,
            isCurrent: b.isCurrentBlock,
            isBase: true
        });
        
        const bOutX = colX_block + 220;
        const bLeaves = leafNodes.filter(l => l.parent === b.id);
        bLeaves.forEach(l => {
            const lInX = colX_leaf;
            paths.push({
                id: `p_${b.id}_${l.id}`,
                d: `M ${bOutX} ${b.y} C ${bOutX + 60} ${b.y}, ${lInX - 60} ${l.y}, ${lInX} ${l.y}`,
                isCurrent: l.isCurrentBlock
            });
        });
    });
    
    return {
        globalRootNode,
        actNode,
        blocksNodes,
        leafNodes,
        paths,
        graphWidth: colX_leaf + 300,
        graphHeight: Math.max(currentY, 600)
    };
  }, [act, block]);

  const extractedColor = act.colorName.replace('bg-', '');

  // Centrar en el bloque activo cuando cambia
  useEffect(() => {
    if (transformRef.current && graphData && containerRef.current) {
      const activeBlockNode = graphData.blocksNodes.find(b => b.isCurrentBlock);
      if (activeBlockNode) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        
        // Calcular la posición para centrar el bloque activo y sus conceptos a la derecha
        // Queremos que colX_block esté hacia la izquierda-centro del contenedor
        const x = -activeBlockNode.x + (containerWidth * 0.3);
        const y = -activeBlockNode.y + (containerHeight / 2);
        
        transformRef.current.setTransform(x, y, 1, 600);
      }
    }
  }, [graphData?.blocksNodes, block.title]); // Re-centrar si cambia el bloque

  if (!graphData) return null;

  return (
    <div className={`w-full relative border-y border-outline-variant/10 bg-transparent overflow-hidden flex flex-col`} style={{ height: '500px' }} ref={containerRef}>
      
      {/* Leyenda Superior Derecha Eliminada */}
      
      {/* Indicador de controles */}
      <div className="absolute bottom-4 right-6 z-20 font-mono text-[10px] text-on-surface-variant/50 uppercase tracking-wider pointer-events-none">
        Scroll / Drag para explorar
      </div>

      <div className="flex-1 w-full relative z-10">
        <TransformWrapper
          ref={transformRef}
          initialScale={1}
          minScale={0.3}
          maxScale={2}
          centerOnInit={false}
          wheel={{ step: 0.1 }}
          panning={{ velocityMultiplier: 0.8 }}
        >
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: graphData.graphWidth, height: graphData.graphHeight }}>
            <div className="relative w-full h-full p-8">
              
              {/* Rutas (Paths) suavizadas */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <motion.g initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.01 } } }}>
                  {graphData.paths.map(path => (
                    <motion.path
                      key={path.id}
                      d={path.d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={path.isCurrent ? (path.isBase ? "1.5" : "1.2") : "1"}
                      className={`transition-all duration-700 ${
                          path.isCurrent 
                              ? `text-${extractedColor}/60` 
                              : 'text-outline-variant/10' 
                      }`}
                      variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
                      }}
                    />
                  ))}
                </motion.g>
              </svg>

              <div className="absolute inset-0 pointer-events-auto" style={{ zIndex: 10 }}>
                  
                  {/* 1. NODO GLOBAL (Conceptos y Principios) */}
                  <button
                       onClick={onGoBack}
                       className={`absolute flex items-center justify-center bg-background/80 backdrop-blur-md hover:bg-surface/50 border border-outline-variant/20 hover:border-outline-variant/40 rounded-xl px-4 py-3 transition-all duration-300 cursor-pointer z-20 text-on-surface`}
                       style={{ left: graphData.globalRootNode.x, top: graphData.globalRootNode.y - 25, width: '270px', height: '50px' }}
                       title="Volver al relato">
                     <span className="font-serif text-[14px] font-medium leading-tight">{graphData.globalRootNode.label}</span>
                  </button>

                  {/* 2. NODO ACTO (Origen Activo) */}
                  <button
                       onClick={onGoBack}
                       className={`absolute flex items-center justify-center bg-background/90 backdrop-blur-md hover:bg-surface/80 border border-${extractedColor}/30 hover:border-${extractedColor}/60 rounded-xl px-4 py-3 z-20 cursor-pointer transition-all duration-300 ${act.textColor}`}
                       style={{ left: graphData.actNode.x, top: graphData.actNode.y - 25, width: '180px', height: '50px', boxShadow: '0 0 40px currentColor, 0 0 80px currentColor' }}
                       title="Volver al relato">
                     <span className={`font-serif text-[15px] font-semibold leading-tight text-on-surface`}>{graphData.actNode.label}</span>
                  </button>

                  {/* 3. NODOS BLOQUES */}
                  {graphData.blocksNodes.map((b, bIdx) => (
                    <button key={b.id} 
                         onClick={() => onBlockSelect && onBlockSelect(bIdx)}
                         className={`absolute flex items-center justify-center rounded-lg px-4 py-2 transition-all duration-300 group cursor-pointer ${
                             b.isCurrentBlock 
                              ? `bg-background/90 backdrop-blur-md border border-${extractedColor}/40 text-on-surface font-semibold z-20 scale-[1.02] ${act.textColor}` 
                              : `bg-background/40 backdrop-blur-sm hover:bg-surface/50 border border-outline-variant/10 hover:border-outline-variant/30 text-on-surface-variant/80 hover:text-on-surface z-15`
                         }`}
                         style={{ left: b.x, top: b.y - 25, width: '220px', height: '50px', boxShadow: b.isCurrentBlock ? '0 0 30px currentColor, 0 0 60px currentColor' : 'none' }}
                         title={b.originalTitle}>
                       <span className={`font-serif text-[14px] leading-tight text-on-surface`}>
                           {b.label}
                       </span>
                    </button>
                  ))}

                  {/* 4. NODOS CONCEPTOS (Hojas) */}
                  {graphData.leafNodes.map(leaf => {
                    const isSelected = activeNodeId === leaf.originalId;
                    const isUnderDevelopment = leaf.category === 'Ejemplos' || leaf.category === 'Relaciones' || leaf.item.label === 'Próximamente'; 
                    const isPilar = leaf.category === 'Pilares';
                    
                    return (
                      <button
                        key={leaf.id}
                        onClick={() => leaf.isCurrentBlock && !isUnderDevelopment && onNodeSelect(leaf.originalId)}
                        disabled={!leaf.isCurrentBlock || isUnderDevelopment}
                        className={`absolute flex items-center text-left whitespace-nowrap px-3 py-2 rounded-lg border transition-all duration-300 group ${
                            !leaf.isCurrentBlock
                              ? 'opacity-30 hover:opacity-50 cursor-default border-outline-variant/10 bg-transparent z-10'
                              : isUnderDevelopment 
                                ? 'opacity-50 cursor-not-allowed border-transparent z-10' 
                                : isSelected 
                                  ? `border-${extractedColor}/40 bg-background/90 backdrop-blur-md cursor-pointer z-30 font-medium scale-[1.02] ${act.textColor}` 
                                  : 'border-outline-variant/10 hover:border-outline-variant/30 bg-background/50 backdrop-blur-sm hover:bg-surface/50 cursor-pointer z-20'
                        }`}
                        style={{ left: leaf.x, top: leaf.y - 18, transform: isSelected ? 'scale(1.02)' : 'scale(1)', boxShadow: isSelected ? '0 0 25px currentColor, 0 0 50px currentColor' : 'none' }}
                      >
                        {!isPilar && (
                            <div className="shrink-0 mr-3 transition-colors duration-300">
                               {getCategoryIcon(leaf.category)}
                            </div>
                        )}
                        <span className={`font-serif text-[14px] transition-colors duration-300 ${
                          isSelected 
                              ? `text-on-surface font-medium` 
                              : leaf.isCurrentBlock
                                  ? `text-on-surface-variant/90 group-hover:text-on-surface`
                                  : `text-on-surface-variant`
                        }`}>
                          {truncateLabel(leaf.item.label, 40)}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}
