import React, { useState, useEffect } from "react";
import { CORE_NODES, NodeDetail } from "../types";
import NetworkGraph from "./NetworkGraph";
import { 
  Search, 
  Activity, 
  Globe, 
  Scale, 
  Info, 
  HelpCircle, 
  BookOpen, 
  ExternalLink, 
  ChevronUp, 
  ChevronDown, 
  X,
  FileText,
  Network,
  Binary
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import TextRenderer from "./TextRenderer";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";

interface ConceptExplorerProps {
  initialNodeId?: string | null;
  onClearInitialNodeId?: () => void;
}

export default function ConceptExplorer({ initialNodeId, onClearInitialNodeId }: ConceptExplorerProps) {
  const [viewMode, setViewMode] = useState<"cards" | "graph">("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedNode, setSelectedNode] = useState<NodeDetail | null>(CORE_NODES[0]);
  const [isBibliographyOpen, setIsBibliographyOpen] = useState(false);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  useEffect(() => {
    if (initialNodeId) {
      const node = CORE_NODES.find((n) => n.id === initialNodeId);
      if (node) {
        setSelectedNode(node);
        setSelectedCategory("all");
        if (window.innerWidth < 1024) {
          setIsMobileDetailOpen(true);
        }
      }
      if (onClearInitialNodeId) {
        onClearInitialNodeId();
      }
    }
  }, [initialNodeId, onClearInitialNodeId]);

  useEffect(() => {
    setIsBibliographyOpen(false);
  }, [selectedNode]);

  const handleSelectNode = (node: NodeDetail) => {
    setSelectedNode(node);
    if (window.innerWidth < 1024) {
      setIsMobileDetailOpen(true);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "sintiencia":
        return <Activity className="w-4 h-4" />;
      case "ecologia":
        return <Globe className="w-4 h-4" />;
      case "sistemas_uso":
        return <Info className="w-4 h-4" />;
      case "etica":
        return <Scale className="w-4 h-4" />;
      default:
        return <HelpCircle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sintiencia": return "var(--primary)";
      case "ecologia": return "oklch(60% 0.12 150)";
      case "sistemas_uso": return "oklch(55% 0.1 240)";
      case "etica": return "oklch(50% 0.1 280)";
      default: return "var(--on-surface-variant)";
    }
  };

  const filteredNodes = CORE_NODES.filter((node) => {
    const matchesSearch = 
      node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || node.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderDetailsContent = (node: NodeDetail) => {
    const catColor = getCategoryColor(node.category);
    
    return (
      <div className="flex flex-col gap-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2 px-3 py-1 bg-surface-dim border border-outline-variant/30 rounded-sm">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: catColor }} />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant">
                  {node.category}
                </span>
             </div>
             <div className="text-[10px] font-mono text-on-surface-variant/40">ID: {node.id.toUpperCase()}</div>
          </div>

          <h2 className="text-display-md text-on-surface border-l-4 border-primary pl-6 py-2">
            {node.title}
          </h2>

          <div className="text-body-md text-on-surface-variant leading-relaxed first-letter:text-4xl first-letter:font-heading first-letter:mr-3 first-letter:float-left first-letter:text-primary">
            <TextRenderer text={node.longDesc} references={node.references} />
          </div>

          <div className="space-y-4 pt-8">
            <h4 className="text-technical-sm text-primary flex items-center gap-2">
              <Binary className="w-4 h-4" />
              Evidencia Científica
            </h4>
            <div className="space-y-3">
              {node.scientificFacts.map((fact, i) => (
                <div key={i} className="flex gap-4 p-5 bg-surface-dim/20 border border-outline-variant/10 rounded-md hover:bg-surface-dim/40 transition-colors">
                  <span className="text-[10px] font-mono text-primary/40 pt-1">0{i + 1}</span>
                  <p className="text-body-md text-on-surface-variant/90 leading-snug">
                    <TextRenderer text={fact} references={node.references} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {node.openQuestion && (
            <div className="pt-8">
              <div className="p-5 border-l-2 border-primary bg-primary/5 rounded-r-md">
                <p className="text-body-md text-on-surface-variant italic">
                  {node.openQuestion}
                </p>
              </div>
            </div>
          )}

          {node.references && node.references.length > 0 && (
            <div className="pt-6">
              <button
                onClick={() => setIsBibliographyOpen(!isBibliographyOpen)}
                className="flex items-center justify-between w-full py-4 border-t border-outline-variant/30 text-technical-xs text-on-surface-variant hover:text-primary transition-all group"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                  REFERENCIAS ({node.references.length})
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
                      {node.references.map((ref) => (
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
            Correlaciones en el Sistema:
          </span>
          <div className="flex flex-wrap gap-2">
            {node.connections.map((connId) => {
              const linked = CORE_NODES.find((n) => n.id === connId);
              if (!linked) return null;
              return (
                <Button
                  key={connId}
                  variant="secondary"
                  size="sm"
                  onClick={() => handleSelectNode(linked)}
                  className="rounded-full border-outline-variant/30"
                >
                  <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: getCategoryColor(linked.category) }} />
                  {linked.title}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 w-full">
      {/* Header with Switch */}
      <div className="flex flex-col md:flex-row gap-6 items-end justify-between border-b border-outline-variant/20 pb-8">
        <div className="space-y-2">
          <h3 className="text-technical-sm text-primary font-bold">Explorador de Conceptos</h3>
          <p className="text-body-md text-on-surface-variant max-w-md">
            Navega por los pilares de la sintiencia animal a través de una red de evidencias interdisciplinares.
          </p>
        </div>
        
        <div className="flex bg-surface-dim/40 p-1 rounded-md border border-outline-variant/20">
          <button
            onClick={() => setViewMode("cards")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-sm text-[10px] font-mono uppercase tracking-widest transition-all ${
              viewMode === "cards" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Catálogo
          </button>
          <button
            onClick={() => setViewMode("graph")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-sm text-[10px] font-mono uppercase tracking-widest transition-all ${
              viewMode === "graph" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            Grafo
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "graph" ? (
          <motion.div
            key="graph-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full aspect-[16/9] lg:aspect-auto lg:h-[700px] border border-outline-variant/20 rounded-md overflow-hidden bg-surface-dim/5"
          >
            <NetworkGraph />
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 min-h-[700px]">
            {/* Left: Filters and Grid */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar evidencia..."
                    className="w-full bg-surface-dim/20 border-b border-outline-variant/50 focus:border-primary px-12 py-3 text-body-md outline-none transition-all"
                  />
                </div>
                <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-none">
                  {["all", "sintiencia", "historia", "ecologia", "etica"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-[10px] font-mono uppercase tracking-tighter px-3 py-2 rounded-sm border transition-all whitespace-nowrap ${
                        selectedCategory === cat
                          ? "bg-primary/10 border-primary text-primary"
                          : "border-outline-variant/30 text-on-surface-variant hover:border-outline-variant"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-y-auto max-h-[800px] pr-4 custom-scrollbar">
                {filteredNodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  const catColor = getCategoryColor(node.category);
                  
                  return (
                    <Card
                      key={node.id}
                      variant={isSelected ? "solid" : "outline"}
                      onClick={() => handleSelectNode(node)}
                      className={`group cursor-pointer border-l-4 transition-all duration-500 hover:border-primary ${
                        isSelected ? "border-primary bg-primary/5" : "border-l-transparent hover:translate-x-1"
                      }`}
                    >
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant opacity-60">
                            {node.category}
                          </span>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: catColor }} />
                        </div>
                        <h4 className="text-display-md !text-lg leading-tight group-hover:text-primary transition-colors">
                          {node.title}
                        </h4>
                        <p className="text-body-md !text-xs text-on-surface-variant/70 line-clamp-3 leading-relaxed">
                          {node.shortDesc}
                        </p>
                        <div className="pt-4 flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Analizar espécimen</span>
                          <span>→</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Right: Detailed View */}
            <div className="hidden lg:block lg:col-span-5 relative">
              <div className="sticky top-32 bg-surface-dim/10 border border-outline-variant/20 rounded-md p-10 h-fit max-h-[80vh] overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  {selectedNode ? (
                    <motion.div key={selectedNode.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {renderDetailsContent(selectedNode)}
                    </motion.div>
                  ) : (
                    <div className="h-[400px] flex flex-col items-center justify-center text-center text-on-surface-variant/40 space-y-4">
                       <HelpCircle className="w-12 h-12 stroke-[0.5px]" />
                       <p className="text-technical-xs uppercase tracking-[0.2em]">Selecciona un axioma</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Modal */}
      <AnimatePresence>
        {isMobileDetailOpen && selectedNode && (
          <div className="lg:hidden fixed inset-0 z-[100] flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileDetailOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-h-[90vh] overflow-y-auto bg-background border-t border-outline-variant/30 p-8 rounded-t-xl z-10 custom-scrollbar shadow-2xl"
            >
              <button onClick={() => setIsMobileDetailOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-dim transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="pb-10">
                {renderDetailsContent(selectedNode)}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
