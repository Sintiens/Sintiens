import React, { useEffect, useState, useRef } from "react";
import { ArrowUp, ArrowDown, BookOpen, LineChart, Clock, MessageSquare, FlaskConical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { TabType } from "./TabNav";

interface OverscrollNavigatorProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  children: React.ReactNode;
}

const FLOW = [
  { id: "historia_narrativa", label: "El Texto", icon: BookOpen },
  { id: "datos", label: "Cifras", icon: LineChart },
  { id: "cronologia", label: "Cronología", icon: Clock },
  { id: "dialectica", label: "Crítica", icon: MessageSquare },
  { id: "laboratorio_hub", label: "Laboratorio", icon: FlaskConical },
];

const PULL_THRESHOLD = 100; // Menos esfuerzo necesario

export default function OverscrollNavigator({ activeTab, onNavigate, children }: OverscrollNavigatorProps) {
  const currentIndex = FLOW.findIndex((step) => step.id === activeTab);
  
  if (currentIndex === -1) {
    return <>{children}</>;
  }

  const prevStep = currentIndex > 0 ? FLOW[currentIndex - 1] : null;
  const nextStep = currentIndex < FLOW.length - 1 ? FLOW[currentIndex + 1] : null;

  const [pullDir, setPullDir] = useState<"pullDown" | "pullUp" | null>(null);
  const [pullDistance, setPullDistance] = useState(0);

  const isNavigating = useRef(false);
  const accumulatedWheel = useRef(0);
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);
  const touchStartY = useRef(0);

  // Observadores para saber si estamos en el borde de la página
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const isAtTopRef = useRef(false);
  const isAtBottomRef = useRef(false);

  useEffect(() => {
    isNavigating.current = false;
    setPullDir(null);
    setPullDistance(0);
    accumulatedWheel.current = 0;
    document.body.style.overscrollBehaviorY = "none";
    
    return () => {
      document.body.style.overscrollBehaviorY = "";
    };
  }, [activeTab]);

  useEffect(() => {
    const observerTop = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      isAtTopRef.current = entry.isIntersecting;
    }, { threshold: 0 });

    const observerBottom = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      isAtBottomRef.current = entry.isIntersecting;
    }, { threshold: 0 });

    if (topRef.current) observerTop.observe(topRef.current);
    if (bottomRef.current) observerBottom.observe(bottomRef.current);

    return () => {
      observerTop.disconnect();
      observerBottom.disconnect();
    };
  }, [activeTab]); // Reiniciar observadores si cambia el tab

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      touchStartY.current = touch.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isNavigating.current) return;
      
      const touch = e.touches[0];
      if (!touch) return;
      const deltaY = touch.clientY - touchStartY.current;
      
      // Si estamos visualizando el topRef y arrastramos hacia abajo
      if (isAtTopRef.current && deltaY > 0 && prevStep) {
        setPullDir("pullDown");
        setPullDistance(Math.min(deltaY, PULL_THRESHOLD));
        if (deltaY > 10) e.preventDefault();
      } 
      // Si estamos visualizando el bottomRef y arrastramos hacia arriba
      else if (isAtBottomRef.current && deltaY < 0 && nextStep) {
        setPullDir("pullUp");
        setPullDistance(Math.min(Math.abs(deltaY), PULL_THRESHOLD));
        if (Math.abs(deltaY) > 10) e.preventDefault();
      } else {
        setPullDistance(0);
      }
    };

    const handleTouchEnd = () => {
      if (isNavigating.current) return;

      if (pullDistance >= PULL_THRESHOLD) {
        isNavigating.current = true;
        if (pullDir === "pullDown" && prevStep) onNavigate(prevStep.id as TabType);
        if (pullDir === "pullUp" && nextStep) onNavigate(nextStep.id as TabType);
      }
      
      setPullDistance(0);
      setTimeout(() => setPullDir(null), 300);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isNavigating.current) return;

      if (isAtTopRef.current && e.deltaY < 0 && prevStep) {
        accumulatedWheel.current += Math.abs(e.deltaY);
        setPullDir("pullDown");
        setPullDistance(Math.min(accumulatedWheel.current, PULL_THRESHOLD));
      } else if (isAtBottomRef.current && e.deltaY > 0 && nextStep) {
        accumulatedWheel.current += Math.abs(e.deltaY);
        setPullDir("pullUp");
        setPullDistance(Math.min(accumulatedWheel.current, PULL_THRESHOLD));
      } else {
        accumulatedWheel.current = 0;
        setPullDistance(0);
      }

      if (accumulatedWheel.current >= PULL_THRESHOLD) {
        isNavigating.current = true;
        if (pullDir === "pullDown" && prevStep) onNavigate(prevStep.id as TabType);
        if (pullDir === "pullUp" && nextStep) onNavigate(nextStep.id as TabType);
        
        accumulatedWheel.current = 0;
        setPullDistance(0);
        setTimeout(() => setPullDir(null), 300);
        return;
      }

      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        accumulatedWheel.current = 0;
        setPullDistance(0);
        setTimeout(() => setPullDir(null), 300);
      }, 350);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("wheel", handleWheel);
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
    };
  }, [pullDistance, pullDir, prevStep, nextStep, onNavigate]);

  const progress = Math.min(pullDistance / PULL_THRESHOLD, 1);
  const showIndicator = pullDistance > 0;
  const isReady = progress >= 1;

  const renderIndicator = (direction: "pullDown" | "pullUp") => {
    if (direction !== pullDir || !showIndicator) return null;
    
    const targetStep = direction === "pullDown" ? prevStep : nextStep;
    if (!targetStep) return null;

    const Icon = targetStep.icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: direction === "pullDown" ? -20 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: direction === "pullDown" ? -20 : 20 }}
        className={`fixed left-0 right-0 z-[9999] flex justify-center pointer-events-none ${
          direction === "pullDown" ? "top-12" : "bottom-12"
        }`}
      >
        <div className="glass-enhance bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-md border border-outline-variant/40 shadow-2xl rounded-full px-6 py-3 flex items-center gap-4 transition-transform duration-200">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-surface-variant/30"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className={`transition-colors duration-200 ${isReady ? "text-primary" : "text-primary/50"}`}
                strokeDasharray={`${progress * 100}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center transition-transform ${isReady ? "scale-110" : ""}`}>
              {direction === "pullDown" ? (
                <ArrowUp className={`w-3.5 h-3.5 ${isReady ? "text-primary" : "text-on-surface-variant"}`} />
              ) : (
                <ArrowDown className={`w-3.5 h-3.5 ${isReady ? "text-primary" : "text-on-surface-variant"}`} />
              )}
            </div>
          </div>
          
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/80">
              {isReady ? "Suelta para ir a" : (direction === "pullDown" ? "Tira para volver" : "Baja más hacia")}
            </span>
            <div className="flex items-center gap-1.5 font-heading text-sm font-bold text-on-surface">
              <Icon className="w-3.5 h-3.5 text-primary" />
              {targetStep.label}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {renderIndicator("pullDown")}
        {renderIndicator("pullUp")}
      </AnimatePresence>
      <div 
        style={{ 
          transform: `translateY(${pullDir === "pullDown" ? pullDistance * 0.3 : pullDir === "pullUp" ? -pullDistance * 0.3 : 0}px)`,
          transition: pullDistance === 0 ? "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)" : "none"
        }}
        className="will-change-transform min-h-full flex flex-col relative"
      >
        <div ref={topRef} className="h-10 w-full absolute top-0 pointer-events-none" />
        {children}
        <div ref={bottomRef} className="h-10 w-full absolute bottom-0 pointer-events-none" />
      </div>
    </>
  );
}
