import { useState, useEffect, useRef } from "react";
import { BookOpen, Flame, Calculator } from "lucide-react";
import {
  SLAUGHTER_RATES_PER_SECOND,
  TOTAL_TERRESTRIAL_PER_SECOND,
  TOTAL_AQUATIC_FARMED_PER_SECOND,
  TOTAL_WILD_FISH_PER_SECOND,
  type SpeciesSlaughterRate
} from "../../data/cifras/slaughterData";
import ScientificEvidenceModal from "./ScientificEvidenceModal";

type TimeWindow = "live" | "1_sec" | "1_min" | "1_hour" | "24_hours" | "1_year" | "custom";
type InclusionMode = "terrestrial" | "with_aquaculture" | "all_sentient";

export default function LiveSlaughterTicker() {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("live");
  const [inclusionMode, setInclusionMode] = useState<InclusionMode>("all_sentient");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [customValue, setCustomValue] = useState<number>(10);
  const [customUnit, setCustomUnit] = useState<"minutes" | "hours" | "days" | "years">("minutes");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (timeWindow !== "live") return;
    const interval = setInterval(() => {
      const now = Date.now();
      setElapsedSeconds((now - startTimeRef.current) / 1000);
    }, 50);

    return () => clearInterval(interval);
  }, [timeWindow]);

  // Calculate rate per second according to inclusion mode
  const currentRatePerSecond =
    inclusionMode === "terrestrial"
      ? TOTAL_TERRESTRIAL_PER_SECOND
      : inclusionMode === "with_aquaculture"
      ? TOTAL_TERRESTRIAL_PER_SECOND + TOTAL_AQUATIC_FARMED_PER_SECOND
      : TOTAL_TERRESTRIAL_PER_SECOND + TOTAL_AQUATIC_FARMED_PER_SECOND + TOTAL_WILD_FISH_PER_SECOND;

  // Custom multiplier in seconds
  const customMultiplierSeconds =
    customUnit === "minutes"
      ? customValue * 60
      : customUnit === "hours"
      ? customValue * 3600
      : customUnit === "days"
      ? customValue * 86400
      : customValue * 31536000;

  // Multiplier depending on selected window
  const multiplier =
    timeWindow === "live"
      ? Math.max(elapsedSeconds, 0.05)
      : timeWindow === "1_sec"
      ? 1
      : timeWindow === "1_min"
      ? 60
      : timeWindow === "1_hour"
      ? 3600
      : timeWindow === "24_hours"
      ? 86400
      : timeWindow === "1_year"
      ? 31536000
      : customMultiplierSeconds;

  const totalKilled = Math.floor(currentRatePerSecond * multiplier);

  // Equivalences
  const stadiumCapacity = 80000; // Santiago Bernabéu / Camp Nou
  const spainPopulation = 48000000;
  const stadiumsEquivalent = (totalKilled / stadiumCapacity).toFixed(1);
  const spainEquivalent = (totalKilled / spainPopulation).toFixed(2);
  const humanCountingYears = (totalKilled / (60 * 60 * 24 * 365.25)).toFixed(1);

  const getEmoji = (iconType: string) => {
    switch (iconType) {
      case "chicken":
        return "🐔";
      case "fish":
        return "🐟";
      case "pig":
        return "🐖";
      case "duck":
        return "🦆";
      case "turkey":
        return "🦃";
      case "sheep":
        return "🐑";
      case "cow":
      default:
        return "🐄";
    }
  };

  const visibleSpecies = SLAUGHTER_RATES_PER_SECOND.filter((sp) => {
    if (inclusionMode === "terrestrial") return sp.id !== "farmed_fish" && sp.id !== "wild_fish";
    if (inclusionMode === "with_aquaculture") return sp.id !== "wild_fish";
    return true;
  });

  return (
    <div className="w-full bg-surface dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 p-6 sm:p-8 space-y-8 text-left relative overflow-hidden shadow-sm">
      {/* Background ambient gradient */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 dark:border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-red-600 dark:text-red-400 uppercase bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              MONITOR EN TIEMPO REAL · EXHIBIT I
            </span>
            <span className="text-xs font-mono text-on-surface-variant/60">
              FAOSTAT 2024 & Fishcount
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
            Contador Global de Sacrificio Animal
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl">
            Cálculo matemático riguroso basado en las estadísticas agregadas de la FAO y Fishcount. Muestra el número de vidas sintientes segadas por segundo.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant/30 dark:border-zinc-700 bg-surface-dim/50 hover:bg-surface-dim text-xs font-mono font-bold text-on-surface transition-all cursor-pointer shadow-sm shrink-0"
        >
          <BookOpen className="w-3.5 h-3.5 text-primary" /> Respaldo Científico
        </button>
      </div>

      {/* Control Filters Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-surface-dim/40 dark:bg-zinc-800/40 p-4 rounded-xl border border-outline-variant/20 dark:border-zinc-800">
        {/* Inclusion Filter */}
        <div className="space-y-1.5 w-full lg:w-auto">
          <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold block">
            Alcance de Especies:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setInclusionMode("terrestrial")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                inclusionMode === "terrestrial"
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-surface dark:bg-zinc-800 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
              }`}
            >
              Solo Terrestres (~2.570/s)
            </button>
            <button
              onClick={() => setInclusionMode("with_aquaculture")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                inclusionMode === "with_aquaculture"
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-surface dark:bg-zinc-800 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
              }`}
            >
              + Piscicultura (~6.502/s)
            </button>
            <button
              onClick={() => setInclusionMode("all_sentient")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                inclusionMode === "all_sentient"
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-surface dark:bg-zinc-800 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
              }`}
            >
              Todos (+ Pesca silvestre ~54.067/s)
            </button>
          </div>
        </div>

        {/* Time Window Filter */}
        <div className="space-y-1.5 w-full lg:w-auto">
          <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold block">
            Ventana Temporal:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "live", label: "En Vivo" },
              { id: "1_sec", label: "1 Seg" },
              { id: "1_min", label: "1 Min" },
              { id: "1_hour", label: "1 Hora" },
              { id: "24_hours", label: "24 Horas" },
              { id: "1_year", label: "1 Año" },
              { id: "custom", label: "Personalizado" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setTimeWindow(tab.id as TimeWindow);
                  if (tab.id === "live") startTimeRef.current = Date.now();
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  timeWindow === tab.id
                    ? "bg-on-surface text-surface dark:bg-white dark:text-zinc-950 shadow-sm"
                    : "bg-surface dark:bg-zinc-800 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Duration Input Bar */}
      {timeWindow === "custom" && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex flex-wrap items-center gap-3 text-xs font-mono">
          <Calculator className="w-4 h-4 text-red-500" />
          <span className="font-bold text-on-surface">Calcular sacrificio acumulado en:</span>
          <input
            type="number"
            min={1}
            max={1000}
            value={customValue}
            onChange={(e) => setCustomValue(Math.max(1, Number(e.target.value)))}
            className="w-20 px-2.5 py-1 bg-surface dark:bg-zinc-900 border border-outline-variant/40 rounded-lg text-center font-bold text-on-surface"
          />
          <select
            value={customUnit}
            onChange={(e) => setCustomUnit(e.target.value as any)}
            className="px-3 py-1 bg-surface dark:bg-zinc-900 border border-outline-variant/40 rounded-lg font-bold text-on-surface cursor-pointer"
          >
            <option value="minutes">Minutos</option>
            <option value="hours">Horas</option>
            <option value="days">Días</option>
            <option value="years">Años</option>
          </select>
          <span className="text-on-surface-variant ml-auto text-[11px]">
            ({customMultiplierSeconds.toLocaleString()} segundos transcurridos)
          </span>
        </div>
      )}

      {/* Huge Counter Billboard */}
      <div className="p-8 sm:p-12 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white rounded-2xl border border-red-500/30 text-center space-y-4 shadow-2xl relative">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-red-400 font-bold uppercase tracking-widest">
          <Flame className="w-4 h-4 text-red-500 animate-pulse" />
          {timeWindow === "live"
            ? `Transcurrido desde la carga: ${elapsedSeconds.toFixed(1)} segundos`
            : timeWindow === "custom"
            ? `Proyección para ${customValue} ${customUnit}`
            : `Total acumulado en ${timeWindow.replace("_", " ")}`}
        </div>

        <div className="text-4xl sm:text-6xl md:text-7xl font-mono font-black tracking-tight text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.4)]">
          {totalKilled.toLocaleString("es-ES")}
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-xl mx-auto">
          individuos con sistema nervioso central sacrificados a nivel mundial
        </p>

        {/* Human Equivalences Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-zinc-800 text-left">
          <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
              🏟️ Capacidad de Estadios
            </span>
            <span className="text-sm font-mono font-bold text-white">
              {stadiumsEquivalent} estadios
            </span>
            <p className="text-[10px] text-zinc-400 font-sans">
              (Equivalente a llenar estadios de 80.000 personas)
            </p>
          </div>

          <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
              🇪🇸 Población de España
            </span>
            <span className="text-sm font-mono font-bold text-white">
              {spainEquivalent}x población
            </span>
            <p className="text-[10px] text-zinc-400 font-sans">
              (48 millones de habitantes humanos)
            </p>
          </div>

          <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
              ⏱️ Tiempo de Conteo Humano
            </span>
            <span className="text-sm font-mono font-bold text-white">
              {humanCountingYears} años
            </span>
            <p className="text-[10px] text-zinc-400 font-sans">
              (Contando 1 animal por segundo sin parar)
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown by Species Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono uppercase tracking-widest text-on-surface-variant font-bold">
            Desglose Específico por Categoría Taxonómica
          </h4>
          <span className="text-xs font-mono text-on-surface-variant/70">
            Tasa por segundo & Total acumulado
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {visibleSpecies.map((sp: SpeciesSlaughterRate, idx) => {
            const count = Math.floor(sp.perSecondRate * multiplier);
            return (
              <div
                key={idx}
                className="p-4 bg-surface dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 flex items-center justify-between gap-3 hover:border-outline-variant/60 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl select-none">{getEmoji(sp.iconType)}</span>
                  <div>
                    <span className="text-xs font-heading font-bold text-on-surface block leading-tight">
                      {sp.name}
                    </span>
                    <span className="text-[10px] font-mono text-on-surface-variant/70">
                      {sp.perSecondRate.toLocaleString("es-ES")} / segundo
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-red-600 dark:text-red-400 block">
                    {count.toLocaleString("es-ES")}
                  </span>
                  <span className="text-[9px] font-mono text-on-surface-variant/60 uppercase">
                    muertos
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scientific modal */}
      <ScientificEvidenceModal
        sourceId="faostat-slaughter-2024"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rawDataset={{
          slaughterRatesPerSecond: SLAUGHTER_RATES_PER_SECOND,
          currentRatePerSecond,
          multiplier,
          totalKilled
        }}
        datasetName="slaughter_rates"
      />
    </div>
  );
}
