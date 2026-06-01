import React, { useEffect, useRef, useState } from "react";
import { CORE_NODES, NodeDetail } from "../types";
import { Info, HelpCircle, Activity, Globe, Scale, Maximize2, Minimize2, ExternalLink, BookOpen, ChevronDown, ChevronUp, Binary } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import TextRenderer from "./TextRenderer";
import { Button } from "./ui/Button";

interface GraphNode {
  id: string;
  category: "sintiencia" | "historia" | "ecologia" | "etica";
  title: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  nodeRef: NodeDetail;
}

interface GraphLink {
  source: string;
  target: string;
}

export default function NetworkGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<GraphLink[]>([]);
  const [selectedNode, setSelectedNode] = useState<NodeDetail | null>(CORE_NODES[0]);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [draggedNode, setDraggedNode] = useState<GraphNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));
  const isMobileDevice = dimensions.width < 768;
  const [isMobileViewport, setIsMobileViewport] = useState(() => typeof window !== "undefined" ? window.innerWidth < 1024 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBibliographyOpen, setIsBibliographyOpen] = useState(false);

  useEffect(() => {
    setIsBibliographyOpen(false);
  }, [selectedNode]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const initialNodes: GraphNode[] = CORE_NODES.map((node, i) => {
      let cx = 300;
      let cy = 200;
      
      if (node.category === "sintiencia") { cx = 150; cy = 120; }
      else if (node.category === "historia") { cx = 450; cy = 120; }
      else if (node.category === "ecologia") { cx = 150; cy = 280; }
      else if (node.category === "etica") { cx = 450; cy = 280; }

      const angle = (i * 0.7) % (Math.PI * 2);
      const dist = 40 + Math.random() * 30;

      return {
        id: node.id,
        category: node.category,
        title: node.title,
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        radius: 12,
        nodeRef: node
      };
    });

    const extractedLinks: GraphLink[] = [];
    CORE_NODES.forEach((node) => {
      node.connections.forEach((targetId) => {
        const linkExists = extractedLinks.some(
          (l) => (l.source === node.id && l.target === targetId) || 
                 (l.source === targetId && l.target === node.id)
        );
        if (!linkExists && CORE_NODES.some((n) => n.id === targetId)) {
          extractedLinks.push({ source: node.id, target: targetId });
        }
      });
    });

    setNodes(initialNodes);
    setLinks(extractedLinks);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      window.requestAnimationFrame(() => {
        setDimensions({
          width: Math.max(width, 300),
          height: Math.max(height, isFullscreen ? 500 : 420)
        });
      });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [isFullscreen]);

  useEffect(() => {
    if (nodes.length === 0) return;

    let animationFrameId: number;

    const step = () => {
      setNodes((currentNodes) => {
        const nextNodes = currentNodes.map((n) => ({ ...n }));
        const isMobile = dimensions.width < 768;

        const repulsionRadius = isMobile ? 140 : 220; 
        for (let i = 0; i < nextNodes.length; i++) {
          const nodeA = nextNodes[i];
          for (let j = i + 1; j < nextNodes.length; j++) {
            const nodeB = nextNodes[j];
            const dx = nodeB.x - nodeA.x;
            const dy = nodeB.y - nodeA.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            
            if (dist < repulsionRadius) {
              const force = (repulsionRadius - dist) * (isMobile ? 0.025 : 0.035);
              const fx = (dx / dist) * force;
              const fy = (dy / dist) * force;
              
              if (draggedNode?.id !== nodeA.id) {
                nodeA.vx -= fx;
                nodeA.vy -= fy;
              }
              if (draggedNode?.id !== nodeB.id) {
                nodeB.vx += fx;
                nodeB.vy += fy;
              }
            }
          }
        }

        const targetDist = isMobile ? 90 : 130;
        links.forEach((link) => {
          const sourceNode = nextNodes.find((n) => n.id === link.source);
          const targetNode = nextNodes.find((n) => n.id === link.target);
          
          if (sourceNode && targetNode) {
            const dx = targetNode.x - sourceNode.x;
            const dy = targetNode.y - sourceNode.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            
            const force = (dist - targetDist) * 0.025;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            if (draggedNode?.id !== sourceNode.id) {
              sourceNode.vx += fx;
              sourceNode.vy += fy;
            }
            if (draggedNode?.id !== targetNode.id) {
              targetNode.vx -= fx;
              targetNode.vy -= fy;
            }
          }
        });

        const multXLeft = isMobile ? 0.3 : 0.25;
        const multXRight = isMobile ? 0.7 : 0.75;
        const multYTop = isMobile ? 0.3 : 0.28;
        const multYBottom = isMobile ? 0.7 : 0.72;
        nextNodes.forEach((node) => {
          let cx = dimensions.width / 2;
          let cy = dimensions.height / 2;

          if (node.category === "sintiencia") { cx = dimensions.width * multXLeft; cy = dimensions.height * multYTop; }
          else if (node.category === "historia") { cx = dimensions.width * multXRight; cy = dimensions.height * multYTop; }
          else if (node.category === "ecologia") { cx = dimensions.width * multXLeft; cy = dimensions.height * multYBottom; }
          else if (node.category === "etica") { cx = dimensions.width * multXRight; cy = dimensions.height * multYBottom; }

          const dx = cx - node.x;
          const dy = cy - node.y;
          node.vx += dx * 0.008;
          node.vy += dy * 0.008;

          node.vx *= 0.72;
          node.vy *= 0.72;

          if (draggedNode?.id !== node.id) {
            node.x += node.vx;
            node.y += node.vy;
          }
        });

        const minCollisionDist = isMobile ? 95 : 135; 
        for (let k = 0; k < 3; k++) {
          for (let i = 0; i < nextNodes.length; i++) {
            const nodeA = nextNodes[i];
            for (let j = i + 1; j < nextNodes.length; j++) {
              const nodeB = nextNodes[j];
              const dx = nodeB.x - nodeA.x;
              const dy = nodeB.y - nodeA.y;
              const dist = Math.sqrt(dx * dx + dy * dy) || 1;

              if (dist < minCollisionDist) {
                const overlap = minCollisionDist - dist;
                const px = (dx / dist) * overlap * 0.5;
                const py = (dy / dist) * overlap * 0.5;

                if (draggedNode?.id === nodeA.id) {
                  nodeB.x += px * 2;
                  nodeB.y += py * 2;
                } else if (draggedNode?.id === nodeB.id) {
                  nodeA.x -= px * 2;
                  nodeA.y -= py * 2;
                } else {
                  nodeA.x -= px;
                  nodeA.y -= py;
                  nodeB.x += px;
                  nodeB.y += py;
                }
              }
            }
          }
        }

        const marginX = isMobile ? 60 : 85;
        const marginY = isMobile ? 35 : 45;
        nextNodes.forEach((node) => {
          node.x = Math.max(marginX, Math.min(dimensions.width - marginX, node.x));
          node.y = Math.max(marginY, Math.min(dimensions.height - marginY, node.y));
        });

        return nextNodes;
      });

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [links, draggedNode, dimensions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    ctx.lineCap = "round";

    links.forEach((link) => {
      const source = nodes.find((n) => n.id === link.source);
      const target = nodes.find((n) => n.id === link.target);

      if (source && target) {
        if (activeCategoryFilter) {
          if (source.category !== activeCategoryFilter && target.category !== activeCategoryFilter) {
            return;
          }
        }

        const isSelectedLink = selectedNode && (source.id === selectedNode.id || target.id === selectedNode.id);
        const isHoverLink = hoveredNode && (source.id === hoveredNode.id || target.id === hoveredNode.id);
        const isHighlight = isSelectedLink || isHoverLink;

        const grad = ctx.createLinearGradient(source.x, source.y, target.x, target.y);
        
        const getCatColor = (cat: string, opacity: number) => {
          if (cat === "sintiencia") return `rgba(53, 15, 12, ${opacity})`;
          if (cat === "ecologia") return `rgba(16, 185, 129, ${opacity})`;
          if (cat === "historia") return `rgba(59, 130, 246, ${opacity})`;
          return `rgba(168, 85, 247, ${opacity})`; 
        };

        let opacity = isDark ? 0.2 : 0.1;
        if (isHighlight) {
          opacity = isSelectedLink ? 0.8 : 0.6;
        } else if (selectedNode || hoveredNode) {
          opacity = isDark ? 0.05 : 0.02;
        }

        grad.addColorStop(0, getCatColor(source.category, opacity));
        grad.addColorStop(1, getCatColor(target.category, opacity));

        ctx.strokeStyle = grad;
        ctx.lineWidth = isHighlight ? 2 : 0.8;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();

        if (isHighlight) {
          const time = Date.now() * 0.0015;
          const count = 2;
          for (let p = 0; p < count; p++) {
            const ratio = (time + p / count) % 1;
            const flowRatio = (source.id === selectedNode?.id || source.id === hoveredNode?.id) ? ratio : (1 - ratio);
            
            const px = source.x + (target.x - source.x) * flowRatio;
            const py = source.y + (target.y - source.y) * flowRatio;

            ctx.fillStyle = getCatColor(source.category, 0.9);
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    });

  }, [nodes, links, selectedNode, hoveredNode, dimensions, isDark, activeCategoryFilter]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * dimensions.width;
    const clickY = ((e.clientY - rect.top) / rect.height) * dimensions.height;

    let clicked: GraphNode | null = null;
    const cardHalfWidth = isMobileDevice ? 55 : 70;
    const cardHalfHeight = isMobileDevice ? 20 : 25;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      if (clickX >= n.x - cardHalfWidth && clickX <= n.x + cardHalfWidth && clickY >= n.y - cardHalfHeight && clickY <= n.y + cardHalfHeight) {
        clicked = n;
        break;
      }
    }

    if (clicked) {
      setSelectedNode((clicked as GraphNode).nodeRef);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * dimensions.width;
    const mouseY = ((e.clientY - rect.top) / rect.height) * dimensions.height;

    let target: GraphNode | null = null;
    const cardHalfWidth = isMobileDevice ? 55 : 70;
    const cardHalfHeight = isMobileDevice ? 20 : 25;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      if (mouseX >= n.x - cardHalfWidth && mouseX <= n.x + cardHalfWidth && mouseY >= n.y - cardHalfHeight && mouseY <= n.y + cardHalfHeight) {
        target = n;
        break;
      }
    }

    if (target) {
      setDraggedNode(target);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * dimensions.width;
    const mouseY = ((e.clientY - rect.top) / rect.height) * dimensions.height;

    if (draggedNode) {
      setNodes((current) =>
        current.map((n) => {
          if (n.id === draggedNode.id) {
            return { ...n, x: mouseX, y: mouseY, vx: 0, vy: 0 };
          }
          return n;
        })
      );
      return;
    }

    let hoverTarget: GraphNode | null = null;
    const cardHalfWidth = isMobileDevice ? 55 : 70;
    const cardHalfHeight = isMobileDevice ? 20 : 25;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      if (mouseX >= n.x - cardHalfWidth && mouseX <= n.x + cardHalfWidth && mouseY >= n.y - cardHalfHeight && mouseY <= n.y + cardHalfHeight) {
        hoverTarget = n;
        break;
      }
    }
    setHoveredNode(hoverTarget);
  };

  const handleMouseUpOrLeave = () => {
    setDraggedNode(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "sintiencia": return <Activity className="w-5 h-5 text-primary" />;
      case "ecologia": return <Globe className="w-5 h-5 text-secondary" />;
      case "historia": return <Info className="w-5 h-5 text-link" />;
      case "etica": return <Scale className="w-5 h-5 text-purple-500" />;
      default: return <HelpCircle className="w-5 h-5 text-on-surface-variant" />;
    }
  };

  return (
    <div 
      className={
        isFullscreen 
          ? "fixed inset-0 z-50 p-6 md:p-8 bg-background flex flex-col lg:flex-row gap-8 overflow-y-auto w-screen h-screen transition-all duration-300"
          : "grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch w-full min-h-[600px] transition-all duration-300"
      }
    >
      <div className={`${isFullscreen ? "lg:w-7/12 flex-1" : "lg:col-span-7"} flex flex-col justify-between p-1 relative min-h-[460px] lg:min-h-[550px]`}>
        <div className="flex items-center justify-between p-4 absolute top-0 left-0 right-0 z-10 pointer-events-none">
           <div className="glass-panel px-4 py-2 rounded-md pointer-events-auto">
              <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase">Ontología Sintiente</span>
           </div>
           <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-10 h-10 p-0 rounded-md pointer-events-auto shadow-xl"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
        </div>

        <div ref={containerRef} className="flex-1 w-full relative min-h-[350px] overflow-hidden bg-surface-dim/10 rounded-md">
          <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="absolute inset-0 cursor-grab active:cursor-grabbing w-full h-full"
          />

          <div 
            className="absolute inset-0 pointer-events-none select-none overflow-hidden"
            style={{ width: dimensions.width, height: dimensions.height }}
          >
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNode?.id === node.id;
              const isFilteredOut = activeCategoryFilter && node.category !== activeCategoryFilter;
              
              const isConnected = selectedNode && (
                node.id === selectedNode.id || 
                selectedNode.connections.includes(node.id) ||
                node.nodeRef.connections.includes(selectedNode.id)
              );

              let borderColor = "border-outline-variant/30";
              let dotColor = "bg-on-surface-variant/40";

              if (node.category === "sintiencia") { dotColor = "bg-primary"; if (isSelected) borderColor = "border-primary"; }
              else if (node.category === "ecologia") { dotColor = "bg-emerald-500"; if (isSelected) borderColor = "border-emerald-500"; }
              else if (node.category === "historia") { dotColor = "bg-blue-500"; if (isSelected) borderColor = "border-blue-500"; }
              else if (node.category === "etica") { dotColor = "bg-purple-500"; if (isSelected) borderColor = "border-purple-500"; }

              let opacity = "opacity-100 scale-100 z-10";
              if (isFilteredOut) opacity = "opacity-20 scale-90 z-0";
              else if (selectedNode && !isConnected) opacity = "opacity-30 scale-95 z-0";
              
              if (isSelected) opacity = "opacity-100 scale-110 z-30 ring-1 ring-primary/20";
              else if (isHovered) opacity = "opacity-100 scale-105 z-20";

              return (
                <div
                  key={node.id}
                  className={`absolute flex items-center gap-2 w-[120px] md:w-[150px] p-2 rounded-md bg-surface/90 border backdrop-blur-md transition-all duration-300 ${borderColor} ${opacity}`}
                  style={{
                    left: 0,
                    top: 0,
                    transform: `translate3d(calc(${node.x}px - 50%), calc(${node.y}px - 50%), 0)`,
                  }}
                >
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
                  <span className="text-[9px] md:text-[10px] font-mono font-bold tracking-tight text-on-surface leading-tight break-words uppercase">
                    {node.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 p-4 bg-background/50 backdrop-blur-md">
            {["sintiencia", "historia", "ecologia", "etica"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(activeCategoryFilter === cat ? null : cat)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border transition-all text-[9px] font-mono uppercase tracking-widest ${
                  activeCategoryFilter === cat 
                    ? "bg-primary text-on-primary border-primary" 
                    : "bg-surface-dim/40 border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${
                  cat === 'sintiencia' ? 'bg-primary' :
                  cat === 'ecologia' ? 'bg-emerald-500' :
                  cat === 'historia' ? 'bg-blue-500' : 'bg-purple-500'
                }`} />
                {cat}
              </button>
            ))}
        </div>
      </div>

      <div className={`${isFullscreen ? "lg:w-5/12 max-h-[90vh] overflow-y-auto" : "lg:col-span-5 lg:border-l border-outline-variant/20"} p-8 lg:p-12 flex flex-col bg-surface/30 backdrop-blur-sm transition-all duration-500`}>
        <AnimatePresence mode="wait">
          {selectedNode ? (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 px-3 py-1 bg-surface-dim border border-outline-variant/30 rounded-sm">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant">
                        {selectedNode.category}
                      </span>
                   </div>
                </div>

                <h2 className="text-display-md text-on-surface">
                  {selectedNode.title}
                </h2>

                <div className="text-body-md text-on-surface-variant leading-relaxed">
                  <TextRenderer text={selectedNode.longDesc} references={selectedNode.references} />
                </div>

                <div className="space-y-4 pt-6">
                  <h4 className="text-technical-sm text-primary flex items-center gap-2">
                    <Binary className="w-4 h-4" />
                    Consenso Científico
                  </h4>
                  <div className="space-y-3">
                    {selectedNode.scientificFacts.map((fact, i) => (
                      <div key={i} className="flex gap-4 p-5 bg-surface-dim/20 border border-outline-variant/10 rounded-md">
                        <span className="text-[10px] font-mono text-primary/40 pt-1">0{i + 1}</span>
                        <p className="text-body-md !text-sm text-on-surface-variant/90 leading-snug">
                          <TextRenderer text={fact} references={selectedNode.references} />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedNode.references && selectedNode.references.length > 0 && (
                  <div className="pt-4">
                    <button
                      onClick={() => setIsBibliographyOpen(!isBibliographyOpen)}
                      className="flex items-center justify-between w-full py-4 border-t border-outline-variant/30 text-technical-xs text-on-surface-variant hover:text-primary transition-all group"
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                        REFERENCIAS ({selectedNode.references.length})
                      </span>
                      {isBibliographyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <AnimatePresence>
                      {isBibliographyOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <ul className="pb-6 space-y-4">
                            {selectedNode.references.map((ref) => (
                              <li key={ref.id} className="text-[11px] leading-relaxed text-on-surface-variant/70 font-sans pl-4 border-l border-outline-variant/50">
                                <span className="font-bold text-primary mr-2">[{ref.id}]</span>
                                {ref.citation}
                                {ref.url && (
                                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-link hover:underline ml-2">
                                    DOI <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <div className="pt-8 border-t border-outline-variant/20">
                <span className="text-[10px] font-mono tracking-widest uppercase text-on-surface-variant/40 block mb-4">
                  Correlaciones:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.connections.map((connId) => {
                    const linked = CORE_NODES.find((n) => n.id === connId);
                    if (!linked) return null;
                    return (
                      <Button
                        key={connId}
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedNode(linked)}
                        className="rounded-full"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          linked.category === 'sintiencia' ? 'bg-primary' :
                          linked.category === 'ecologia' ? 'bg-emerald-500' :
                          linked.category === 'historia' ? 'bg-blue-500' : 'bg-purple-500'
                        }`} />
                        {linked.title}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-on-surface-variant/40 space-y-4">
               <HelpCircle className="w-12 h-12 stroke-[0.5px]" />
               <p className="text-technical-xs uppercase tracking-[0.2em]">Selecciona un axioma</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
