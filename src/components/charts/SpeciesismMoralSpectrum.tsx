import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scale, Heart } from "lucide-react";

interface SpecimenComparison {
  id: string;
  name: string;
  species: string;
  culturalCategory: "Familiar / Protegido" | "Alimento / Mercancía" | "Símbolo de Conservación";
  cognitiveCapacity: string;
  emotionalAffections: string;
  legalStatus: string;
  culturalTreatment: string;
  ethicalDissonance: string;
}

const SPECIMENS: SpecimenComparison[] = [
  {
    id: "dog",
    name: "Perro Doméstico",
    species: "Canis lupus familiaris",
    culturalCategory: "Familiar / Protegido",
    cognitiveCapacity: "Inteligencia equivalente a un niño humano de 2-2.5 años; reconoce más de 150 palabras.",
    emotionalAffections: "Vínculo de apego oxitocinérgico demostrado hacia cuidadores humanos.",
    legalStatus: "Protección legal contra el maltrato, multas severas y penas de prisión por abandono o dolor intencionado.",
    culturalTreatment: "Duerme dentro del hogar, recibe asistencia veterinaria avanzada y afecto familiar.",
    ethicalDissonance: "Ampliamente amado y protegido por razones puramente culturales y de convivencia histórica.",
  },
  {
    id: "pig",
    name: "Cerdo Doméstico",
    species: "Sus scrofa domesticus",
    culturalCategory: "Alimento / Mercancía",
    cognitiveCapacity: "Supera cognitivamente a los perros en pruebas de espejos, uso de palancas y laberintos (Broom 2009).",
    emotionalAffections: "Jerarquía social compleja, empatía empírica con congéneres y juego social continuo.",
    legalStatus: "Considerado bien de producción; se autoriza el corte de rabos sin anestesia y el encierro en jaulas parideras.",
    culturalTreatment: "Confinamiento intensivo en naves de cemento y sacrificio en fosa de gas CO2 a los 6 meses de vida.",
    ethicalDissonance: "Tratado como producto a pesar de poseer una consciencia y capacidad de dolor idéntica o superior al perro.",
  },
  {
    id: "cow",
    name: "Vaca Lechera",
    species: "Bos taurus",
    culturalCategory: "Alimento / Mercancía",
    cognitiveCapacity: "Memoria espacial a largo plazo, aprendizaje de apertura de cerrojos y resolución de acertijos.",
    emotionalAffections: "Forma amistades preferenciales (best friends); aumento del ritmo cardíaco al separarse de amigas.",
    legalStatus: "Inseminación forzada anual y separación obligatoria del ternero a las 24 horas para ordeño comercial.",
    culturalTreatment: "Explotación láctea continua hasta el agotamiento orgánico y posterior sacrificio a los 4-5 años de edad.",
    ethicalDissonance: "Mismo nivel de apego maternal que los mamíferos protegidos, pero invisibilizado por la industria láctea.",
  },
  {
    id: "octopus",
    name: "Pulpo Común",
    species: "Octopus vulgaris",
    culturalCategory: "Alimento / Mercancía",
    cognitiveCapacity: "Uso de herramientas (cáscaras de coco como refugio), memoria episódica y aprendizaje por observación.",
    emotionalAffections: "Evitación activa de lugares asociados con dolor previo y autoadministración de analgesia (Crook 2021).",
    legalStatus: "Cero regulación de bienestar en mataderos pesqueros; ebullición o asfixia en hielo en vivo.",
    culturalTreatment: "Capturado en nasas o criado en granjas marinas sin normas mínimas de aturdimiento humanitario.",
    ethicalDissonance: "Reconocido en la Declaración de Nueva York 2024 como sintiente, pero sin ninguna protección penal.",
  },
];

export default function SpeciesismMoralSpectrum() {
  const [selectedId, setSelectedId] = useState<string>("pig");

  const active = SPECIMENS.find((s) => s.id === selectedId) || SPECIMENS[0]!;

  return (
    <div className="w-full bg-surface/90 dark:bg-surface-dim/80 border border-outline-variant/30 rounded-2xl p-5 sm:p-7 space-y-6 shadow-sm">
      <div className="space-y-1 border-b border-outline-variant/20 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
            DILEMA FILOSÓFICO · ESPECISMO
          </span>
          <span className="text-[10px] font-mono text-on-surface-variant/60">
            Espectro Moral Comparado
          </span>
        </div>
        <h4 className="text-lg sm:text-xl font-heading font-bold text-on-surface">
          ¿Por qué amamos a unos y nos comemos a otros?
        </h4>
        <p className="text-xs font-sans text-on-surface-variant leading-relaxed">
          La diferencia en el trato ético y legal no responde a diferencias en su capacidad de sentir dolor o afecto, sino a una clasificación cultural arbitraria.
        </p>
      </div>

      {/* Specimen Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {SPECIMENS.map((spec) => {
          const isSelected = spec.id === selectedId;

          return (
            <button
              key={spec.id}
              onClick={() => setSelectedId(spec.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-primary/10 border-primary ring-2 ring-primary/20 shadow-sm"
                  : "bg-surface-dim/40 border-outline-variant/20 hover:bg-surface-dim/70 text-on-surface-variant"
              }`}
            >
              <div className="space-y-1">
                <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold inline-block ${
                  spec.culturalCategory === "Familiar / Protegido"
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                    : "bg-red-500/15 text-red-700 dark:text-red-400"
                }`}>
                  {spec.culturalCategory.split("/")[0]}
                </span>
                <div className="font-heading font-bold text-xs sm:text-sm text-on-surface">
                  {spec.name}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Comparison Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            {/* Cognitive & Emotional Capacities */}
            <div className="p-4 rounded-xl bg-surface-dim/60 border border-outline-variant/20 space-y-2">
              <span className="font-mono text-[10px] text-primary font-bold uppercase flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" /> Biología: Mente y Sintiencia
              </span>
              <p className="text-on-surface-variant leading-relaxed text-[11px]">
                <strong className="text-on-surface">Cognición:</strong> {active.cognitiveCapacity}
              </p>
              <p className="text-on-surface-variant leading-relaxed text-[11px]">
                <strong className="text-on-surface">Emoción:</strong> {active.emotionalAffections}
              </p>
            </div>

            {/* Cultural & Legal Treatment */}
            <div className="p-4 rounded-xl bg-surface-dim/60 border border-outline-variant/20 space-y-2">
              <span className="font-mono text-[10px] text-primary font-bold uppercase flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" /> Cultura: Estatus y Destino
              </span>
              <p className="text-on-surface-variant leading-relaxed text-[11px]">
                <strong className="text-on-surface">Estatus Legal:</strong> {active.legalStatus}
              </p>
              <p className="text-on-surface-variant leading-relaxed text-[11px]">
                <strong className="text-on-surface">Tratamiento Social:</strong> {active.culturalTreatment}
              </p>
            </div>
          </div>

          {/* Dissonance Verdict Banner */}
          <div className="p-3.5 bg-amber-500/10 border border-amber-500/25 rounded-xl space-y-1 text-xs">
            <span className="font-mono text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase block">
              La Disonancia Moral Especista:
            </span>
            <p className="font-sans text-on-surface-variant text-[11px] leading-relaxed">
              {active.ethicalDissonance}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
