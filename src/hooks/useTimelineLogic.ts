import { useState, useRef, useMemo, useEffect } from "react";
import { TimelineMilestone, TimelineGroup } from "../types";
import { TIMELINE_DATA } from "../data/TIMELINE_DATA";
import { Scale, Globe, Layers, Activity } from "lucide-react";

export const TRACK_META: Record<string, { label: string; icon: any; color: string; textClass: string; bgClass: string; borderClass: string; glowClass: string }> = {
  usos: {
    label: "Usos e Instrumentalización",
    icon: Layers,
    color: "sky",
    textClass: "text-sky-600 dark:text-sky-400",
    bgClass: "bg-sky-50 dark:bg-sky-950/20",
    borderClass: "border-sky-200 dark:border-sky-900/50",
    glowClass: "shadow-sky-500/10 dark:shadow-sky-400/5",
  },
  etica: {
    label: "Ética, Filosofía y Consciencia",
    icon: Scale,
    color: "purple",
    textClass: "text-purple-600 dark:text-purple-400",
    bgClass: "bg-purple-50 dark:bg-purple-950/20",
    borderClass: "border-purple-200 dark:border-purple-900/50",
    glowClass: "shadow-purple-500/10 dark:shadow-purple-400/5",
  },
  regulaciones: {
    label: "Regulaciones y Leyes",
    icon: Globe,
    color: "emerald",
    textClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/20",
    borderClass: "border-emerald-200 dark:border-emerald-900/50",
    glowClass: "shadow-emerald-500/10 dark:shadow-emerald-400/5",
  },
  alimentacion: {
    label: "Alimentación y Evolución",
    icon: Activity,
    color: "amber",
    textClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-50 dark:bg-amber-950/20",
    borderClass: "border-amber-200 dark:border-amber-900/50",
    glowClass: "shadow-amber-500/10 dark:shadow-amber-400/5",
  }
};
// Map of causal connections between milestones
export const TIMELINE_CONNECTIONS: Record<string, string[]> = {
  "domesticacion-neolitica": ["mutacion-lactasa"],
  "mutacion-lactasa": ["domesticacion-neolitica"],
  "bentham-sufrimiento": ["martins-act"],
  "martins-act": ["bentham-sufrimiento"],
  "chicago-stock-yards": ["macrogranjas-mediados-siglo"],
  "watson-veganismo-origen": ["sintesis-b12"],
  "sintesis-b12": ["watson-veganismo-origen", "consenso-nutricional-and", "agricultura-celular-era"],
  "macrogranjas-mediados-siglo": ["informe-brambell-ley", "singer-regan-auge", "chicago-stock-yards"],
  "informe-brambell-ley": ["macrogranjas-mediados-siglo", "tratado-lisboa", "end-the-cage-age-initiative"],
  "singer-regan-auge": ["macrogranjas-mediados-siglo", "declaracion-montreal"],
  "tratado-lisboa": ["informe-brambell-ley", "reforma-codigo-civil-es"],
  "declaracion-cambridge": ["reforma-codigo-civil-es", "declaracion-montreal"],
  "declaracion-montreal": ["declaracion-cambridge", "singer-regan-auge"],
  "consenso-nutricional-and": ["sintesis-b12"],
  "agricultura-celular-era": ["sintesis-b12"],
  "end-the-cage-age-initiative": ["informe-brambell-ley"],
  "reforma-codigo-civil-es": ["declaracion-cambridge", "tratado-lisboa"]
};

export interface MilestoneWithTrack extends TimelineMilestone {
  trackId: string;
  color: string;
}

export function useTimelineLogic() {
  // Layout state toggle
  const [layoutView, setLayoutView] = useState<"swimlanes" | "detallado">("swimlanes");
  
  // Shared state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone | null>(null);
  const [hoveredMilestoneId, setHoveredMilestoneId] = useState<string | null>(null);
  const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>({});

  // Original Detallado view states
  const [activeTimelineId, setActiveTimelineId] = useState<"usos" | "etica" | "regulaciones" | "alimentacion">("usos");
  const [isBibliographyOpen, setIsBibliographyOpen] = useState(false);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [compareA, setCompareA] = useState<TimelineMilestone | null>(null);
  const [compareB, setCompareB] = useState<TimelineMilestone | null>(null);

  // Parallel swimlanes state
  const [mobileActiveTrack, setMobileActiveTrack] = useState<string>("todos");
  const [svgPaths, setSvgPaths] = useState<{ path: string; color: string; fromId: string; toId: string }[]>([]);
  const [dotPositions, setDotPositions] = useState<Record<string, number>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Reset bibliography collapse on milestone change
  useEffect(() => {
    setIsBibliographyOpen(false);
  }, [selectedMilestone]);

  // Flatten all milestones
  const allMilestones: MilestoneWithTrack[] = useMemo(() => TIMELINE_DATA.flatMap((group: TimelineGroup) =>
    group.milestones.map((milestone: TimelineMilestone) => ({
      ...milestone,
      trackId: group.id,
      color: group.color
    }))
  ).sort((a, b) => a.year - b.year), []);

  const calculateDotPositions = () => {
    if (!containerRef.current || layoutView !== "swimlanes" || window.innerWidth < 1024) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const positions: Record<string, number> = {};

    allMilestones.forEach(m => {
      const cardEl = document.getElementById(`milestone-card-${m.id}`);
      if (cardEl) {
        const cardRect = cardEl.getBoundingClientRect();
        positions[m.id] = cardRect.top + cardRect.height / 2 - cRect.top;
      }
    });

    setDotPositions(positions);
  };

  const calculateConnections = () => {
    if (!containerRef.current || !hoveredMilestoneId || layoutView !== "swimlanes") {
      setSvgPaths([]);
      return;
    }

    const activeId = hoveredMilestoneId;
    const connectedIds = TIMELINE_CONNECTIONS[activeId] || [];
    if (connectedIds.length === 0) {
      setSvgPaths([]);
      return;
    }

    const cRect = containerRef.current.getBoundingClientRect();
    const fromEl = document.getElementById(`milestone-card-${activeId}`);
    if (!fromEl) {
      setSvgPaths([]);
      return;
    }

    const paths: { path: string; color: string; fromId: string; toId: string }[] = [];

    connectedIds.forEach(toId => {
      const toEl = document.getElementById(`milestone-card-${toId}`);
      if (!toEl) return;

      const fRect = fromEl.getBoundingClientRect();
      const tRect = toEl.getBoundingClientRect();

      const startX = fRect.left - cRect.left;
      const startY = fRect.top + 24 - cRect.top;
      
      const endX = tRect.left - cRect.left;
      const endY = tRect.top + 24 - cRect.top;

      const dy = Math.abs(startY - endY);
      const loopOffset = Math.min(130, 45 + dy * 0.15);
      
      const cp1X = startX - loopOffset;
      const cp1Y = startY;
      
      const cp2X = endX - loopOffset;
      const cp2Y = endY;

      const fromMilestone = allMilestones.find(m => m.id === activeId);
      const color = TRACK_META[fromMilestone?.trackId || "usos"]?.color || "violet";

      paths.push({
        path: `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`,
        color: color,
        fromId: activeId,
        toId
      });
    });

    setSvgPaths(paths);
  };

  const toggleExpand = (id: string) => {
    setExpandedMilestones(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    setTimeout(() => {
      calculateConnections();
      calculateDotPositions();
    }, 250);
  };

  const focusMilestone = (id: string) => {
    setSelectedMilestone(allMilestones.find(m => m.id === id) || null);
    setHoveredMilestoneId(id);
    setExpandedMilestones(prev => ({ ...prev, [id]: true }));

    const cardElement = document.getElementById(`milestone-card-${id}`);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
      cardElement.classList.add("ring-2", "ring-purple-500", "dark:ring-purple-400");
      setTimeout(() => {
        cardElement.classList.remove("ring-2", "ring-purple-500", "dark:ring-purple-400");
      }, 1500);
    }
    setTimeout(() => {
      calculateConnections();
      calculateDotPositions();
    }, 250);
  };

  const getCausality = (id: string) => {
    const connectedIds = TIMELINE_CONNECTIONS[id] || [];
    const current = allMilestones.find(m => m.id === id);
    if (!current) return { causes: [], effects: [] };

    const causes: MilestoneWithTrack[] = [];
    const effects: MilestoneWithTrack[] = [];

    connectedIds.forEach(connId => {
      const linked = allMilestones.find(m => m.id === connId);
      if (linked) {
        if (linked.year < current.year) {
          causes.push(linked);
        } else {
          effects.push(linked);
        }
      }
    });

    return { causes, effects };
  };

  return {
    layoutView, setLayoutView,
    searchQuery, setSearchQuery,
    selectedMilestone, setSelectedMilestone,
    hoveredMilestoneId, setHoveredMilestoneId,
    expandedMilestones, setExpandedMilestones,
    activeTimelineId, setActiveTimelineId,
    isBibliographyOpen, setIsBibliographyOpen,
    isMobileDetailOpen, setIsMobileDetailOpen,
    isCompareMode, setIsCompareMode,
    compareA, setCompareA,
    compareB, setCompareB,
    mobileActiveTrack, setMobileActiveTrack,
    svgPaths, setSvgPaths,
    dotPositions, setDotPositions,
    containerRef, svgRef,
    allMilestones,
    toggleExpand,
    focusMilestone,
    getCausality,
    calculateConnections,
    calculateDotPositions
  };
}
