import { useState, useMemo } from "react";
import {
  Search,
  ArrowUpDown,
  Download,
  BookOpen,
  Calculator,
  Table as TableIcon
} from "lucide-react";
import {
  MASTER_FOOD_MATRIX,
  FOOD_CATEGORIES_INFO,
  type FoodCategory,
  type FoodEnvironmentalMetric
} from "../../data/cifras/foodMatrixData";
import ScientificEvidenceModal from "./ScientificEvidenceModal";

type NormalizationMode = "per_kg" | "per_100g_protein";

export default function FoodEnvironmentalMatrix() {
  const [activeTab, setActiveTab] = useState<"matrix" | "diet_simulator">("matrix");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | "all">("all");
  const [normalizationMode, setNormalizationMode] = useState<NormalizationMode>("per_kg");
  const [sortField, setSortField] = useState<keyof FoodEnvironmentalMetric>("ghgKgCO2eqPerKg");
  const [sortAscending, setSortAscending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Diet Swap Simulator States
  const [replaceFoodId, setReplaceFoodId] = useState<string>("beef_pasture");
  const [withFoodId, setWithFoodId] = useState<string>("tofu");
  const [weeklyGrams, setWeeklyGrams] = useState<number>(300);

  // Filtered and sorted data for matrix
  const filteredData = useMemo(() => {
    return MASTER_FOOD_MATRIX.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      const field =
        normalizationMode === "per_kg"
          ? sortField
          : sortField === "ghgKgCO2eqPerKg"
          ? "ghgKgCO2eqPer100gProt"
          : sortField === "landM2PerKg"
          ? "landM2Per100gProt"
          : sortField === "waterLitresPerKg"
          ? "waterLitresPer100gProt"
          : "eutrophicationGramsPO4eqPer100gProt";

      const valA = (a[field] as number) ?? 0;
      const valB = (b[field] as number) ?? 0;
      return sortAscending ? valA - valB : valB - valA;
    });
  }, [searchTerm, selectedCategory, normalizationMode, sortField, sortAscending]);

  const handleSort = (field: keyof FoodEnvironmentalMetric) => {
    if (sortField === field) {
      setSortAscending(!sortAscending);
    } else {
      setSortField(field);
      setSortAscending(false);
    }
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = [
      "Alimento",
      "Categoría",
      "GEI (kg CO2eq/kg)",
      "Tierra (m2/kg)",
      "Agua (L/kg)",
      "Eutrofización (g PO4eq/kg)",
      "GEI (kg CO2eq/100g Prot)",
      "Tierra (m2/100g Prot)",
      "Agua (L/100g Prot)",
      "Eutrofización (g PO4eq/100g Prot)"
    ];

    const rows = filteredData.map((f) => [
      `"${f.name}"`,
      `"${f.categoryLabel}"`,
      f.ghgKgCO2eqPerKg,
      f.landM2PerKg,
      f.waterLitresPerKg,
      f.eutrophicationGramsPO4eqPerKg,
      f.ghgKgCO2eqPer100gProt,
      f.landM2Per100gProt,
      f.waterLitresPer100gProt,
      f.eutrophicationGramsPO4eqPer100gProt
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sintiens_food_matrix_${normalizationMode}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Diet Swap Calculation (Annual)
  const replaceItem = MASTER_FOOD_MATRIX.find((f) => f.id === replaceFoodId) || MASTER_FOOD_MATRIX[0]!;
  const withItem = MASTER_FOOD_MATRIX.find((f) => f.id === withFoodId) || MASTER_FOOD_MATRIX[5]!;

  const annualKg = (weeklyGrams * 52) / 1000;
  const savedGhgKg = Math.max(0, (replaceItem.ghgKgCO2eqPerKg - withItem.ghgKgCO2eqPerKg) * annualKg);
  const savedLandM2 = Math.max(0, (replaceItem.landM2PerKg - withItem.landM2PerKg) * annualKg);
  const savedWaterL = Math.max(0, (replaceItem.waterLitresPerKg - withItem.waterLitresPerKg) * annualKg);
  const savedEutrophG = Math.max(0, (replaceItem.eutrophicationGramsPO4eqPerKg - withItem.eutrophicationGramsPO4eqPerKg) * annualKg);

  // Equivalences
  const carKmEquivalent = Math.round(savedGhgKg / 0.192); // 192g CO2/km average gasoline car
  const tennisCourtsEquivalent = (savedLandM2 / 260).toFixed(1); // 260 m2 per tennis court
  const showersEquivalent = Math.round(savedWaterL / 65); // 65 L per 8-minute shower

  return (
    <div className="w-full bg-surface dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 p-6 sm:p-8 space-y-6 text-left relative overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 dark:border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary dark:text-emerald-400 uppercase bg-primary/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-primary/20">
              MATRIZ COMPARATIVA Y SIMULADOR · EXHIBIT VIII
            </span>
            <span className="text-xs font-mono text-on-surface-variant/60">
              Metaanálisis Science (Poore & Nemecek 2018)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
            Matriz Multidimensional de Impacto Ambiental de los Alimentos
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl">
            Comparativa de más de 20 alimentos en cuatro dimensiones biofísicas con normalización dual y simulador de ahorro anual por sustitución dietética.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant/30 dark:border-zinc-700 bg-surface-dim/50 hover:bg-surface-dim text-xs font-mono font-bold text-on-surface transition-all cursor-pointer shadow-sm shrink-0"
        >
          <BookOpen className="w-3.5 h-3.5 text-primary" /> Respaldo Científico
        </button>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-outline-variant/20 dark:border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab("matrix")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "matrix"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface bg-surface-dim/30"
          }`}
        >
          <TableIcon className="w-3.5 h-3.5" /> Matriz Completa de Alimentos
        </button>
        <button
          onClick={() => setActiveTab("diet_simulator")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "diet_simulator"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface bg-surface-dim/30"
          }`}
        >
          <Calculator className="w-3.5 h-3.5" /> Simulador de Ahorro Dietético Anual
        </button>
      </div>

      {/* TAB 1: Master Food Matrix Table */}
      {activeTab === "matrix" && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-surface-dim/40 dark:bg-zinc-800/40 p-4 rounded-xl border border-outline-variant/20 dark:border-zinc-800">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
              <input
                type="text"
                placeholder="Buscar alimento (ej. ternera, tofu, leche, lentejas)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-surface dark:bg-zinc-900 border border-outline-variant/30 rounded-xl text-xs font-sans focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant/50"
              />
            </div>

            {/* Normalization Mode */}
            <div className="flex items-center gap-1 bg-surface dark:bg-zinc-900 p-1 rounded-xl border border-outline-variant/20">
              <button
                onClick={() => setNormalizationMode("per_kg")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  normalizationMode === "per_kg"
                    ? "bg-primary text-on-primary shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Por kg de producto
              </button>
              <button
                onClick={() => setNormalizationMode("per_100g_protein")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  normalizationMode === "per_100g_protein"
                    ? "bg-primary text-on-primary shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Por 100 g de proteína
              </button>
            </div>

            {/* Export Button */}
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-surface dark:bg-zinc-900 hover:bg-surface-dim text-xs font-mono font-bold rounded-xl border border-outline-variant/30 text-on-surface transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-primary" /> Descargar CSV
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-on-surface text-surface dark:bg-white dark:text-zinc-950 shadow-xs"
                  : "bg-surface-dim/40 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Todos ({MASTER_FOOD_MATRIX.length})
            </button>
            {(Object.keys(FOOD_CATEGORIES_INFO) as FoodCategory[]).map((key) => {
              const info = FOOD_CATEGORIES_INFO[key];
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedCategory === key
                      ? "bg-on-surface text-surface dark:bg-white dark:text-zinc-950 shadow-xs"
                      : "bg-surface-dim/40 text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {info.label}
                </button>
              );
            })}
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-outline-variant/30 dark:border-zinc-800 bg-surface dark:bg-zinc-900">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="bg-surface-dim/50 dark:bg-zinc-800/60 border-b border-outline-variant/20 dark:border-zinc-800 text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">
                  <th className="py-3.5 px-4 font-bold">Alimento</th>
                  <th
                    onClick={() => handleSort("ghgKgCO2eqPerKg")}
                    className="py-3.5 px-4 text-right cursor-pointer hover:text-on-surface select-none"
                  >
                    <div className="inline-flex items-center gap-1">
                      <span>GEI (kg CO₂eq)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("landM2PerKg")}
                    className="py-3.5 px-4 text-right cursor-pointer hover:text-on-surface select-none"
                  >
                    <div className="inline-flex items-center gap-1">
                      <span>Suelo (m²)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("waterLitresPerKg")}
                    className="py-3.5 px-4 text-right cursor-pointer hover:text-on-surface select-none"
                  >
                    <div className="inline-flex items-center gap-1">
                      <span>Agua dulce (L)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("eutrophicationGramsPO4eqPerKg")}
                    className="py-3.5 px-4 text-right cursor-pointer hover:text-on-surface select-none"
                  >
                    <div className="inline-flex items-center gap-1">
                      <span>Eutrofización (g PO₄)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 dark:divide-zinc-800/60 font-mono">
                {filteredData.map((item) => {
                  const ghg = normalizationMode === "per_kg" ? item.ghgKgCO2eqPerKg : item.ghgKgCO2eqPer100gProt;
                  const land = normalizationMode === "per_kg" ? item.landM2PerKg : item.landM2Per100gProt;
                  const water = normalizationMode === "per_kg" ? item.waterLitresPerKg : item.waterLitresPer100gProt;
                  const eutro = normalizationMode === "per_kg" ? item.eutrophicationGramsPO4eqPerKg : item.eutrophicationGramsPO4eqPer100gProt;

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-surface-dim/40 dark:hover:bg-zinc-800/40 transition-colors"
                    >
                      <td className="py-3 px-4 font-sans font-semibold text-on-surface">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: FOOD_CATEGORIES_INFO[item.category].color }}
                          />
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td className={`py-3 px-4 text-right font-bold ${ghg > 20 ? "text-red-600 dark:text-red-400" : ghg < 2 ? "text-emerald-600 dark:text-emerald-400" : "text-on-surface"}`}>
                        {ghg.toFixed(2)}
                      </td>
                      <td className={`py-3 px-4 text-right ${land > 50 ? "text-red-600 dark:text-red-400 font-bold" : "text-on-surface"}`}>
                        {land.toFixed(1)}
                      </td>
                      <td className="py-3 px-4 text-right text-on-surface">
                        {water.toLocaleString("es-ES")}
                      </td>
                      <td className={`py-3 px-4 text-right ${eutro > 50 ? "text-red-600 dark:text-red-400 font-bold" : "text-on-surface"}`}>
                        {eutro.toFixed(1)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Diet Swap & Annual Savings Simulator */}
      {activeTab === "diet_simulator" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-heading font-bold text-on-surface">
              Simulador de Ahorro Ecológico Individual por Sustitución Semanal
            </h4>
            <p className="text-xs text-on-surface-variant">
              Calcula exactamente cuánto impacto ambiental ahorras al año al sustituir una ración semanal de carne o lácteos por una opción vegetal.
            </p>
          </div>

          {/* Interactive controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-2xl border border-outline-variant/20 dark:border-zinc-800">
            {/* 1. What you replace */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-red-600 dark:text-red-400 font-bold block">
                1. Alimento a sustituir:
              </label>
              <select
                value={replaceFoodId}
                onChange={(e) => setReplaceFoodId(e.target.value)}
                className="w-full px-3 py-2 bg-surface dark:bg-zinc-900 border border-outline-variant/30 rounded-xl text-xs font-sans text-on-surface cursor-pointer"
              >
                {MASTER_FOOD_MATRIX.filter((f) => f.category === "ruminant" || f.category === "non_ruminant" || f.category === "dairy_eggs").map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.ghgKgCO2eqPerKg} kg CO₂/kg)
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Amount per week */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-primary font-bold block">
                2. Cantidad semanal:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={50}
                  max={2000}
                  step={50}
                  value={weeklyGrams}
                  onChange={(e) => setWeeklyGrams(Math.max(50, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-surface dark:bg-zinc-900 border border-outline-variant/30 rounded-xl text-xs font-mono font-bold text-on-surface text-center"
                />
                <span className="text-xs font-mono text-on-surface-variant shrink-0">gramos/sem</span>
              </div>
            </div>

            {/* 3. Replaced with */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold block">
                3. Sustituir por:
              </label>
              <select
                value={withFoodId}
                onChange={(e) => setWithFoodId(e.target.value)}
                className="w-full px-3 py-2 bg-surface dark:bg-zinc-900 border border-outline-variant/30 rounded-xl text-xs font-sans text-on-surface cursor-pointer"
              >
                {MASTER_FOOD_MATRIX.filter((f) => f.category === "plant_protein" || f.category === "plant_staple").map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.ghgKgCO2eqPerKg} kg CO₂/kg)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Grid */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-on-surface-variant font-bold block">
              Tu Ahorro Ecológico Neto Cada Año ({annualKg.toFixed(1)} kg consumidos):
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* GHG */}
              <div className="p-5 bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/30 rounded-2xl space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-emerald-700 dark:text-emerald-400 font-bold block">
                  💨 Emisiones Evitadas
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                  {Math.round(savedGhgKg).toLocaleString("es-ES")} kg CO₂
                </div>
                <p className="text-xs text-on-surface-variant font-sans">
                  ≈ {carKmEquivalent.toLocaleString("es-ES")} km en coche de gasolina no conducidos
                </p>
              </div>

              {/* Land */}
              <div className="p-5 bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/30 rounded-2xl space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-emerald-700 dark:text-emerald-400 font-bold block">
                  🌲 Suelo Ahorrado
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                  {Math.round(savedLandM2).toLocaleString("es-ES")} m²
                </div>
                <p className="text-xs text-on-surface-variant font-sans">
                  ≈ {tennisCourtsEquivalent} pistas de tenis de naturaleza devuelta
                </p>
              </div>

              {/* Water */}
              <div className="p-5 bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/30 rounded-2xl space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-emerald-700 dark:text-emerald-400 font-bold block">
                  💧 Agua Dulce Ahorrada
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                  {Math.round(savedWaterL).toLocaleString("es-ES")} Litros
                </div>
                <p className="text-xs text-on-surface-variant font-sans">
                  ≈ {showersEquivalent.toLocaleString("es-ES")} duchas completas de 8 minutos
                </p>
              </div>

              {/* Eutrophication */}
              <div className="p-5 bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/30 rounded-2xl space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-emerald-700 dark:text-emerald-400 font-bold block">
                  🌊 Eutrofización Evitada
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                  {Math.round(savedEutrophG).toLocaleString("es-ES")} g PO₄
                </div>
                <p className="text-xs text-on-surface-variant font-sans">
                  Protección de ríos y acuíferos frente a floraciones tóxicas
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scientific Evidence Modal */}
      <ScientificEvidenceModal
        sourceId="poore-nemecek-2018"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rawDataset={{
          normalizationMode,
          foodMatrix: filteredData
        }}
        datasetName="food_environmental_matrix"
      />
    </div>
  );
}
