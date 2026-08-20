import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Scale,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Eye,
  Award,
  Info,
  ShieldCheck,
  XCircle
} from "lucide-react";
import {
  INDUSTRIAL_PRACTICES,
  COMMERCIAL_SEALS,
  WELFARE_REFERENCES,
  type IndustrialPracticeContrast
} from "../data/welfarewashingData";

interface WelfarewashingScannerProps {
  onNavigateToTab?: (tab: string) => void;
}

export default function WelfarewashingScanner({ onNavigateToTab: _onNavigateToTab }: WelfarewashingScannerProps) {
  const [selectedPracticeId, setSelectedPracticeId] = useState<IndustrialPracticeContrast["id"]>("tail_docking");
  const [activeTab, setActiveTab] = useState<"split_view" | "seals_audit">("split_view");
  const [selectedSealId, setSelectedSealId] = useState<string>("welfair");

  const currentPractice = useMemo(() => {
    return INDUSTRIAL_PRACTICES.find((p) => p.id === selectedPracticeId) || INDUSTRIAL_PRACTICES[0]!;
  }, [selectedPracticeId]);

  const currentSeal = useMemo(() => {
    return COMMERCIAL_SEALS.find((s) => s.id === selectedSealId) || COMMERCIAL_SEALS[0]!;
  }, [selectedSealId]);

  return (
    <div id="welfarewashing-scanner-view" className="space-y-16 w-full relative text-left">
      {/* SECTION 0: Hero & Hook */}
      <div
        id="hero"
        className="-mt-12 lg:-mt-20 flex flex-col items-center relative bg-transparent w-full"
        style={{
          width: "calc(100vw - var(--scrollbar-width, 0px))",
          marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
          marginRight: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
        }}
      >
        <div className="w-full flex flex-col lg:justify-center items-center text-center relative h-[550px] min-h-[550px] lg:h-[600px] lg:min-h-[600px] pt-16 lg:pt-28 pb-20 lg:pb-24 px-4 md:px-6 lg:px-8 border-b border-outline-variant/15">
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            <div className="absolute top-[25px] left-[20px] w-6 h-6 flex items-center justify-center">
              <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
            </div>
            <div className="absolute top-[25px] right-[20px] w-6 h-6 flex items-center justify-center">
              <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
            </div>
            <div className="absolute bottom-[25px] left-[20px] w-6 h-6 flex items-center justify-center">
              <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
            </div>
            <div className="absolute bottom-[25px] right-[20px] w-6 h-6 flex items-center justify-center">
              <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
            <Scale
              className="text-zinc-900 dark:text-zinc-100 blur"
              style={{
                width: "clamp(144px, 45vw, 540px)",
                height: "clamp(144px, 45vw, 540px)",
                opacity: 0.1,
                strokeWidth: 1.2,
              }}
            />
          </div>

          <div className="flex-1 lg:flex-none flex flex-col justify-center items-center w-full">
            <div className="space-y-2 lg:space-y-4 max-w-3xl w-full text-center relative z-10 mt-12 lg:mt-20">
              <h1 className="text-[clamp(36px,7vw,68px)] font-bold tracking-tight font-heading leading-[1.08] text-on-background select-none">
                Escáner de Welfarewashing
              </h1>
              <p className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] text-center tracking-normal select-none">
                La brecha entre la promesa de la ley y la realidad de la granja: cómo las cláusulas de excepción legalizan el sufrimiento estándar.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Scale className="w-3.5 h-3.5 text-primary" />
                  DERECHO COMPARADO UE
                </span>
                <span className="w-px h-4 bg-outline-variant/50 hidden sm:inline" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-primary" />
                  DICTÁMENES EFSA
                </span>
                <span className="w-px h-4 bg-outline-variant/50 hidden sm:inline" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-primary" />
                  PANTALLA DIVIDIDA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-\[1280px\] mx-auto px-4 md:px-6 lg:px-8 space-y-12">
        
        {/* SUB-NAVIGATION TABS */}
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("split_view")}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                activeTab === "split_view"
                  ? "bg-primary text-on-primary font-bold border-primary shadow-sm"
                  : "bg-surface-dim/40 border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Comparativa en Pantalla Dividida (6 Prácticas)
            </button>
            <button
              onClick={() => setActiveTab("seals_audit")}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                activeTab === "seals_audit"
                  ? "bg-primary text-on-primary font-bold border-primary shadow-sm"
                  : "bg-surface-dim/40 border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Auditoría de Sellos Comerciales
            </button>
          </div>
        </div>

        {/* ── TAB 1: PANTALLA DIVIDIDA (LEY VS REALIDAD) ── */}
        {activeTab === "split_view" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Practice Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {INDUSTRIAL_PRACTICES.map((p) => {
                const isSelected = p.id === selectedPracticeId;

                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPracticeId(p.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-surface-dim/90 dark:bg-surface-dim border-primary ring-2 ring-primary/20 shadow-md"
                        : "bg-surface/50 dark:bg-surface-dim/20 border-outline-variant/30 hover:border-outline hover:bg-surface-dim/40"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-primary font-bold">
                          {p.speciesCategory}
                        </span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                      </div>
                      <div className="font-heading font-bold text-xs sm:text-sm text-on-surface leading-tight">
                        {p.title.split("(")[0]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* SPLIT SCREEN COMPARISON */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: The Law & Marketing (Blue/Institutional Tone) */}
              <div className="lg:col-span-6 bg-surface/80 dark:bg-surface-dim/60 border border-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="space-y-1 border-b border-outline-variant/20 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                        COLUMNA A · LA LEY Y EL MARKETING
                      </span>
                      <ShieldCheck className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
                      Lo que se promete
                    </h3>
                  </div>

                  {/* Official Regulation & Quote */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-on-surface block">
                      {currentPractice.theLawAndMarketing.officialRegulation}:
                    </span>
                    <blockquote className="text-xs sm:text-sm font-serif italic text-on-surface-variant/90 border-l-2 border-primary/50 pl-3 leading-relaxed">
                      {currentPractice.theLawAndMarketing.legalQuote}
                    </blockquote>
                  </div>

                  {/* Marketing Claim */}
                  <div className="p-3.5 bg-primary/10 rounded-xl border border-primary/20 space-y-1 text-xs font-mono">
                    <span className="text-[10px] text-primary font-bold uppercase block">
                      Claim Publicitario de la Industria:
                    </span>
                    <p className="font-sans text-on-surface-variant text-[11px] italic">
                      {currentPractice.theLawAndMarketing.marketingClaim}
                    </p>
                  </div>

                  {/* Public Perception */}
                  <div className="space-y-1 text-xs">
                    <span className="font-mono text-[10px] text-on-surface-variant/60 uppercase block">
                      Percepción del Consumidor:
                    </span>
                    <p className="font-sans text-on-surface-variant leading-relaxed text-[11px]">
                      {currentPractice.theLawAndMarketing.publicPerception}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/20 text-[10px] font-mono text-on-surface-variant/60 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" /> Marco normativo formal de la Unión Europea
                </div>
              </div>

              {/* Right Column: The Reality & Escape Clause (Red/Alert Tone) */}
              <div className="lg:col-span-6 bg-red-500/5 dark:bg-red-500/10 border border-red-500/25 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="space-y-1 border-b border-red-500/20 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-red-700 dark:text-red-400 font-bold">
                        COLUMNA B · LA REALIDAD Y LA EXCEPCIÓN
                      </span>
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
                      Lo que ocurre en la granja
                    </h3>
                  </div>

                  {/* Escape Clause & Application % */}
                  <div className="p-3.5 bg-red-500/15 border border-red-500/30 rounded-xl space-y-1 text-xs font-mono">
                    <div className="flex items-center justify-between font-bold text-red-700 dark:text-red-300">
                      <span>La Cláusula de Escape Legal:</span>
                      <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[9px] uppercase">
                        {currentPractice.theRealityAndExceptions.applicationPercentage}
                      </span>
                    </div>
                    <p className="font-sans text-on-surface-variant text-[11px] pt-1">
                      {currentPractice.theRealityAndExceptions.escapeClause}
                    </p>
                  </div>

                  {/* Veterinary & Physical Fact */}
                  <div className="space-y-1.5 text-xs">
                    <span className="font-mono text-[10px] font-bold text-red-700 dark:text-red-400 uppercase block">
                      Consecuencia Fisiológica Real:
                    </span>
                    <p className="font-sans text-on-surface-variant leading-relaxed text-[11px]">
                      {currentPractice.theRealityAndExceptions.veterinaryFact}
                    </p>
                  </div>

                  {/* Scientific Evidence */}
                  <div className="space-y-1.5 text-xs">
                    <span className="font-mono text-[10px] font-bold text-on-surface uppercase block">
                      Evidencia Etológica:
                    </span>
                    <p className="font-sans text-on-surface-variant leading-relaxed text-[11px]">
                      {currentPractice.theRealityAndExceptions.scientificEvidence}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-red-500/20 text-[10px] font-mono text-red-700 dark:text-red-400 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> La excepción legal aplicada como norma universal
                </div>
              </div>

            </div>

            {/* EFSA SCIENTIFIC VERDICT BOX */}
            <div className="bg-surface/90 dark:bg-surface-dim/70 border border-primary/20 rounded-2xl p-6 space-y-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Dictamen Científico Oficial de la EFSA:
              </span>
              <p className="text-xs sm:text-sm font-serif italic text-on-surface-variant/90 leading-relaxed border-l-2 border-primary/40 pl-3">
                {currentPractice.efsaVerdict}
              </p>
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: AUDITORÍA DE SELLOS COMERCIALES ── */}
        {activeTab === "seals_audit" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Seals Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {COMMERCIAL_SEALS.map((seal) => {
                const isSelected = seal.id === selectedSealId;

                return (
                  <button
                    key={seal.id}
                    onClick={() => setSelectedSealId(seal.id)}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-surface-dim/90 dark:bg-surface-dim border-primary ring-2 ring-primary/20 shadow-md"
                        : "bg-surface/50 dark:bg-surface-dim/20 border-outline-variant/30 hover:border-outline hover:bg-surface-dim/40"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                          {seal.auditGrade}
                        </span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                      </div>
                      <h4 className="font-heading font-bold text-base text-on-surface">
                        {seal.sealName}
                      </h4>
                      <span className="text-[10px] font-mono text-on-surface-variant/60 block">
                        {seal.promoter}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Seal Detailed Audit Box */}
            <div className="bg-surface/90 dark:bg-surface-dim/60 border border-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-1 border-b border-outline-variant/20 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                    Auditoría Forense de Certificación
                  </span>
                  <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold">
                    {currentSeal.auditGrade}
                  </span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-on-surface">
                  {currentSeal.sealName}
                </h3>
              </div>

              {/* What it claims */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-primary block uppercase tracking-wider">
                  Lo que afirma el marketing en el envase:
                </span>
                <p className="text-sm font-serif italic text-on-surface-variant leading-relaxed bg-surface-dim/60 p-4 rounded-xl border border-outline-variant/20">
                  {currentSeal.whatItClaims}
                </p>
              </div>

              {/* What it actually permits */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold text-red-700 dark:text-red-400 block uppercase tracking-wider">
                  Lo que autoriza y tolera bajo este sello:
                </span>
                <div className="space-y-2">
                  {currentSeal.whatItActuallyPermits.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-mono flex items-start gap-2.5 text-on-surface"
                    >
                      <span className="text-red-500 font-bold shrink-0">✕</span>
                      <span className="font-sans text-[11px] leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SCIENTIFIC & LEGAL REFERENCES */}
        <div className="bg-surface-dim/30 border border-outline-variant/20 rounded-2xl p-6 space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/70 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Directivas de la UE, Dictámenes de la EFSA y Referencias
          </div>
          <div className="space-y-2 text-[11px] font-mono text-on-surface-variant">
            {WELFARE_REFERENCES.map((ref) => (
              <div key={ref.id} className="flex items-start justify-between gap-3 border-b border-outline-variant/10 pb-2 last:border-0 last:pb-0">
                <span>{ref.citation}</span>
                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 shrink-0 font-bold"
                  >
                    Documento <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
