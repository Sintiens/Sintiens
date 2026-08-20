import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Copy, Check, Download, BookOpen, FileText, BarChart2 } from "lucide-react";
import { SCIENTIFIC_SOURCES, type ScientificSource } from "../../data/cifras/scientificSources";

interface ScientificEvidenceModalProps {
  sourceId: string;
  isOpen: boolean;
  onClose: () => void;
  rawDataset?: any;
  datasetName?: string;
}

export default function ScientificEvidenceModal({
  sourceId,
  isOpen,
  onClose,
  rawDataset,
  datasetName = "dataset"
}: ScientificEvidenceModalProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "bibtex" | "raw_data">("summary");
  const [copiedApa, setCopiedApa] = useState(false);
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  const source: ScientificSource = SCIENTIFIC_SOURCES[sourceId] || SCIENTIFIC_SOURCES["poore-nemecek-2018"]!;

  const handleCopyApa = () => {
    const apaString = `${source.authors} (${source.year}). ${source.title}. ${source.journalOrPublisher}. ${source.doi ? `https://doi.org/${source.doi}` : source.url}`;
    navigator.clipboard.writeText(apaString);
    setCopiedApa(true);
    setTimeout(() => setCopiedApa(false), 2000);
  };

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(source.bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const handleDownloadBibtex = () => {
    const blob = new Blob([source.bibtex], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${source.id}.bib`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    if (!rawDataset) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(rawDataset, null, 2))}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `${datasetName}_${source.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-surface dark:bg-zinc-900 border border-outline-variant/40 dark:border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-outline-variant/20 dark:border-zinc-800 flex items-start justify-between gap-4 bg-surface-dim/40 dark:bg-zinc-900/90">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-primary dark:text-emerald-400 font-bold bg-primary/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-primary/20">
                  Respaldo Científico & Metodología
                </span>
                <span className="text-xs font-mono text-on-surface-variant/70">
                  {source.year}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-on-surface leading-snug">
                {source.title}
              </h3>
              <p className="text-xs text-on-surface-variant font-mono">
                {source.authors} · <span className="italic">{source.journalOrPublisher}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-dim transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 pt-3 border-b border-outline-variant/10 dark:border-zinc-800 bg-surface dark:bg-zinc-900">
            <button
              onClick={() => setActiveTab("summary")}
              className={`pb-2.5 px-3 text-xs font-mono font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "summary"
                  ? "border-primary text-primary dark:text-emerald-400"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Metodología & Hallazgos
            </button>
            <button
              onClick={() => setActiveTab("bibtex")}
              className={`pb-2.5 px-3 text-xs font-mono font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "bibtex"
                  ? "border-primary text-primary dark:text-emerald-400"
                  : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Cita Académica & BibTeX
            </button>
            {rawDataset && (
              <button
                onClick={() => setActiveTab("raw_data")}
                className={`pb-2.5 px-3 text-xs font-mono font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "raw_data"
                    ? "border-primary text-primary dark:text-emerald-400"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" /> Dataset JSON Crudo
              </button>
            )}
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm font-sans">
            {activeTab === "summary" && (
              <div className="space-y-6">
                {/* Meta details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant font-bold block">
                      Institución / Afiliación
                    </span>
                    <span className="text-xs font-semibold text-on-surface">
                      {source.institution}
                    </span>
                  </div>
                  <div className="p-3.5 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant font-bold block">
                      DOI / Enlace Oficial
                    </span>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-primary dark:text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      {source.doi ? `doi:${source.doi}` : "Ver publicación oficial"}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Scope & Sample */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-primary dark:text-emerald-400 font-bold">
                    Muestra & Alcance Experimental
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed bg-surface-dim/30 dark:bg-zinc-800/20 p-3.5 rounded-xl border border-outline-variant/15">
                    {source.sampleOrScope}
                  </p>
                </div>

                {/* Methodology */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-primary dark:text-emerald-400 font-bold">
                    Resumen Metodológico
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed bg-surface-dim/30 dark:bg-zinc-800/20 p-3.5 rounded-xl border border-outline-variant/15">
                    {source.methodologySummary}
                  </p>
                </div>

                {/* Statistical uncertainty if available */}
                {source.statisticalUncertainty && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-primary dark:text-emerald-400 font-bold">
                      Intervalos de Incertidumbre Estadística (IC 95%)
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed bg-surface-dim/30 dark:bg-zinc-800/20 p-3.5 rounded-xl border border-outline-variant/15">
                      {source.statisticalUncertainty}
                    </p>
                  </div>
                )}

                {/* Key Findings */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-primary dark:text-emerald-400 font-bold">
                    Principales Conclusiones Cuantitativas
                  </h4>
                  <ul className="space-y-2">
                    {source.keyFindings.map((finding, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-emerald-400 mt-2 shrink-0" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "bibtex" && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-on-surface-variant font-bold">
                      Formato APA (7ª Edición)
                    </span>
                    <button
                      onClick={handleCopyApa}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-dim dark:bg-zinc-800 hover:bg-surface-dim/80 text-xs font-mono font-bold rounded-lg border border-outline-variant/20 transition-all cursor-pointer"
                    >
                      {copiedApa ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedApa ? "Copiado" : "Copiar APA"}
                    </button>
                  </div>
                  <div className="p-3.5 bg-surface-dim/50 dark:bg-zinc-800/50 rounded-xl border border-outline-variant/20 text-xs font-mono text-on-surface leading-relaxed">
                    {source.authors} ({source.year}). {source.title}. <span className="italic">{source.journalOrPublisher}</span>. {source.doi ? `https://doi.org/${source.doi}` : source.url}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-on-surface-variant font-bold">
                      Entrada BibTeX para Gestores de Referencias (Zotero / Mendeley / LaTeX)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyBibtex}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-dim dark:bg-zinc-800 hover:bg-surface-dim/80 text-xs font-mono font-bold rounded-lg border border-outline-variant/20 transition-all cursor-pointer"
                      >
                        {copiedBibtex ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedBibtex ? "Copiado" : "Copiar BibTeX"}
                      </button>
                      <button
                        onClick={handleDownloadBibtex}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-on-primary hover:bg-primary/90 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> Descargar .bib
                      </button>
                    </div>
                  </div>
                  <pre className="p-4 bg-zinc-950 text-emerald-400 rounded-xl border border-zinc-800 text-xs font-mono overflow-x-auto leading-relaxed">
                    {source.bibtex}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "raw_data" && rawDataset && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-on-surface-variant font-bold">
                    Dataset Completo en Formato Estructurado
                  </span>
                  <button
                    onClick={handleDownloadJson}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-on-primary hover:bg-primary/90 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" /> Descargar JSON
                  </button>
                </div>
                <pre className="p-4 bg-zinc-950 text-zinc-300 rounded-xl border border-zinc-800 text-xs font-mono max-h-[350px] overflow-auto leading-relaxed">
                  {JSON.stringify(rawDataset, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-5 border-t border-outline-variant/20 dark:border-zinc-800 flex items-center justify-between bg-surface-dim/30 dark:bg-zinc-900">
            <span className="text-[11px] font-mono text-on-surface-variant">
              Revisado por pares · Open Science
            </span>
            <div className="flex items-center gap-3">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono font-bold text-primary dark:text-emerald-400 hover:underline"
              >
                Abrir en Journal <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-surface-dim dark:bg-zinc-800 hover:bg-surface-dim/80 text-xs font-mono font-bold rounded-lg border border-outline-variant/30 transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
