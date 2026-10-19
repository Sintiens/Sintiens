import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import type { TabType } from "../types";
import CompactIndexContent from "./CompactIndexContent";

interface CompactIndexNavProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: (rect?: DOMRect) => void;
}

export default function CompactIndexNav({ activeTab, onNavigate, theme, onToggleTheme }: CompactIndexNavProps) {
  const [mode, setMode] = useState<"apart" | "top" | "off">("apart");
  const navRef = useRef<HTMLDivElement | null>(null);

  const themeToggle = (
    <button
      type="button"
      onClick={(event) => onToggleTheme(event.currentTarget.getBoundingClientRect())}
      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-on-surface-variant transition-colors hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </button>
  );

  // Solo se muestra dentro del hero. Fuera de él no reaparece: evita el solape
  // entre el índice completo y una segunda barra fija.
  useEffect(() => {
    const readMode = () => {
      const wrapper = navRef.current?.closest("[data-nav-mode]");
      const next = wrapper?.getAttribute("data-nav-mode");
      setMode(next === "top" ? "top" : next === "off" ? "off" : "apart");
    };
    readMode();
    const id = requestAnimationFrame(readMode);
    const wrapper = navRef.current?.closest("[data-nav-mode]");
    const observer = wrapper ? new MutationObserver(readMode) : null;
    observer?.observe(wrapper!, { attributes: true, attributeFilter: ["data-nav-mode"] });
    window.addEventListener("scroll", readMode, { passive: true });
    window.addEventListener("resize", readMode, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      observer?.disconnect();
      window.removeEventListener("scroll", readMode);
      window.removeEventListener("resize", readMode);
    };
  }, []);

  if (mode !== "apart") {
    return <div ref={navRef} className="h-0" aria-hidden />;
  }

  return (
    <div ref={navRef} className="relative w-full max-w-full min-w-0">
      <CompactIndexContent
        activeTab={activeTab}
        onNavigate={onNavigate}
        themeToggle={themeToggle}
      />
    </div>
  );
}
