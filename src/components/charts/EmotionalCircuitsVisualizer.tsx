import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Heart, Sparkles, ShieldAlert, Smile, Flame } from "lucide-react";

interface EmotionalCircuit {
  id: string;
  name: string;
  latinName: string;
  icon: typeof Brain;
  color: string;
  bgColor: string;
  borderColor: string;
  neuralCenter: string;
  crossSpeciesPresence: string;
  biologicalPurpose: string;
  empiricalExample: string;
}

const CIRCUITS: EmotionalCircuit[] = [
  {
    id: "seeking",
    name: "Búsqueda & Curiosidad",
    latinName: "SEEKING System",
    icon: Sparkles,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    neuralCenter: "Área tegmental ventral, hipotálamo lateral y núcleo accumbens (vía dopaminérgica).",
    crossSpeciesPresence: "Universal en todos los vertebrados (mamíferos, aves, reptiles, peces).",
    biologicalPurpose: "Impulsa la exploración activa, el forrajeo, el aprendizaje y la anticipación del placer.",
    empiricalExample: "Cerdos y vacas exploran activamente entornos enriquecidos y muestran deleite al resolver problemas cognitivos.",
  },
  {
    id: "fear",
    name: "Miedo & Supervivencia",
    latinName: "FEAR System",
    icon: ShieldAlert,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    neuralCenter: "Amígdala basolateral y sustancia gris periacueductal (PAG).",
    crossSpeciesPresence: "Conservado evolutivamente desde peces óseos hasta primates.",
    biologicalPurpose: "Alerta ante depredadores y amenazas inminentes; genera parálisis o huida táctica.",
    empiricalExample: "Aves y mamíferos sufren picos masivos de corticosterona y taquicardia al ser transportados al matadero.",
  },
  {
    id: "panic_grief",
    name: "Pánico / Duelo por Separación",
    latinName: "PANIC / GRIEF System",
    icon: Heart,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    neuralCenter: "Cíngulo anterior, tálamo dorsomedial y receptores opioides.",
    crossSpeciesPresence: "Presente en todos los mamíferos y aves con cuidado parental.",
    biologicalPurpose: "Alerta al recién nacido ante la pérdida de la madre; base biológica del apego y el dolor emocional.",
    empiricalExample: "Las vacas lecheras emiten llamadas acústicas de angustia (vocalizaciones de lamento) durante días tras la retirada forzosa de sus terneros.",
  },
  {
    id: "play",
    name: "Juego & Alegría Social",
    latinName: "PLAY System",
    icon: Smile,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    neuralCenter: "Núcleos talámicos parafasciculares y corteza somatosensorial.",
    crossSpeciesPresence: "Demostrado en mamíferos, cuervos, loros, pulpos y peces cíclidos.",
    biologicalPurpose: "Ensayo de habilidades motoras, sincronización social y bienestar hedónico intrínseco.",
    empiricalExample: "Los lechones y corderos juegan a perseguirse y 'sonríen' mediante vocalizaciones ultrasónicas de júbilo cuando no están confinados.",
  },
  {
    id: "rage",
    name: "Ira & Frustración",
    latinName: "RAGE System",
    icon: Flame,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    neuralCenter: "Amígdala medial e hipotálamo ventromedial.",
    crossSpeciesPresence: "Común a todos los amniotas.",
    biologicalPurpose: "Defensa del espacio vital y liberación de energía cuando la libertad de movimiento es restringida.",
    empiricalExample: "Animales en jaulas estrechas exhiben conductas estereotípicas agresivas y frustración extrema por inmovilidad.",
  },
];

export default function EmotionalCircuitsVisualizer() {
  const [selectedCircuitId, setSelectedCircuitId] = useState<string>("panic_grief");

  const active = CIRCUITS.find((c) => c.id === selectedCircuitId) || CIRCUITS[0]!;
  const IconComponent = active.icon;

  return (
    <div className="w-full bg-surface/90 dark:bg-surface-dim/80 border border-outline-variant/30 rounded-2xl p-5 sm:p-7 space-y-6 shadow-sm">
      <div className="space-y-1 border-b border-outline-variant/20 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
            NEUROCIENCIA AFECTIVA · JAAK PANKSEPP
          </span>
          <span className="text-[10px] font-mono text-on-surface-variant/60">
            5 Circuitos Subcorticales
          </span>
        </div>
        <h4 className="text-lg sm:text-xl font-heading font-bold text-on-surface">
          Homología de las Emociones Primarias
        </h4>
        <p className="text-xs font-sans text-on-surface-variant leading-relaxed">
          Las emociones no nacieron con el ser humano: se originan en el tronco encefálico profundo compartido por todos los vertebrados antes de la aparición del neocórtex.
        </p>
      </div>

      {/* Circuit Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {CIRCUITS.map((circuit) => {
          const isSelected = circuit.id === selectedCircuitId;
          const BtnIcon = circuit.icon;

          return (
            <button
              key={circuit.id}
              onClick={() => setSelectedCircuitId(circuit.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? `${circuit.bgColor} ${circuit.borderColor} ring-2 ring-primary/20 shadow-sm`
                  : "bg-surface-dim/40 border-outline-variant/20 hover:bg-surface-dim/70 text-on-surface-variant"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <BtnIcon className={`w-4 h-4 ${circuit.color}`} />
              </div>
              <div className="font-heading font-bold text-xs text-on-surface leading-tight">
                {circuit.name.split("&")[0]?.split("/")[0] ?? circuit.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Dossier for Active Circuit */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="p-5 sm:p-6 rounded-2xl bg-surface-dim/60 border border-outline-variant/20 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${active.bgColor} ${active.color}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-heading font-bold text-base text-on-surface">
                  {active.name}
                </h5>
                <span className="text-[10px] font-mono text-on-surface-variant/60">
                  {active.latinName}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
              Subcortical
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-on-surface font-bold uppercase block">
                Sustrato Neuroanatómico:
              </span>
              <p className="text-on-surface-variant text-[11px] leading-relaxed">
                {active.neuralCenter}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] text-on-surface font-bold uppercase block">
                Presencia Interespecífica:
              </span>
              <p className="text-on-surface-variant text-[11px] leading-relaxed">
                {active.crossSpeciesPresence}
              </p>
            </div>
          </div>

          <div className="p-3 bg-surface/90 dark:bg-surface-dim rounded-xl border border-outline-variant/20 space-y-1 text-xs">
            <span className="font-mono text-[10px] text-primary font-bold uppercase block">
              Observación Etológica en la Realidad:
            </span>
            <p className="font-sans text-on-surface-variant text-[11px] italic leading-relaxed">
              «{active.empiricalExample}»
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
