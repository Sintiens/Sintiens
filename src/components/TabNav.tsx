import { Sun, Moon } from "lucide-react";

export type TabType = "historia_narrativa" | "grafo" | "cronologia" | "dialectica" | "calculadora" | "validador" | "datos";

interface TabNavProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const TABS: { id: TabType; label: string }[] = [
  { id: "historia_narrativa", label: "Relato" },
  { id: "grafo", label: "Glosario" },
  { id: "cronologia", label: "Historia" },
  { id: "dialectica", label: "Tesis" },
  { id: "calculadora", label: "Impacto" },
  { id: "validador", label: "IA" },
];

export default function TabNav({ activeTab, onNavigate, theme, onToggleTheme }: TabNavProps) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {TABS.map((tab) =>
          activeTab === tab.id ? (
            <span
              key={tab.id}
              className="glass-enhance border border-outline-variant/35 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[11px] uppercase font-mono tracking-widest text-primary font-bold relative before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-sm before:z-[-1] before:pointer-events-none select-none"
            >
              {tab.label}
            </span>
          ) : (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md text-[10px] sm:text-[11px] uppercase font-mono tracking-widest transition-all duration-300 text-on-surface-variant hover:text-primary cursor-pointer active:scale-95"
            >
              {tab.label}
            </button>
          )
        )}
        <button
          onClick={onToggleTheme}
          className="ml-2 p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-all cursor-pointer active:scale-95"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
