import React from "react";

const COLOR_MAP: Record<string, string> = {
  "bg-ch1": "var(--ch1)",
  "bg-ch2": "var(--ch2)",
  "bg-ch3": "var(--ch3)",
  "bg-ch4": "var(--ch4)",
  "bg-ch5": "var(--ch5)",
  "bg-ch6": "var(--ch6)",
};

export default function AmbientGlow({
  colorClass,
  className = "",
  opacity = 0.05,
  style,
}: {
  colorClass: string;
  className?: string;
  opacity?: number;
  style?: React.CSSProperties;
}) {
  const color = COLOR_MAP[colorClass] || "var(--ch1)";

  return (
    <div className={`absolute pointer-events-none select-none z-0 overflow-visible ${className}`} style={style}>
      <div
        className="absolute top-1/2 left-1/2 w-[145%] h-[65%] aspect-[2.2/1] filter blur-[35px] sm:blur-[48px] animate-wobble-slow transition-colors duration-[600ms] ease-in-out"
        style={{ opacity, color }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            fill="currentColor"
            d="M30,75 C70,15 130,25 175,55 C195,85 165,135 145,165 C105,195 55,175 35,135 C15,95 10,80 30,75 Z"
          >
            <animate
              attributeName="d"
              dur="28s"
              repeatCount="indefinite"
              values="
                M30,75 C70,15 130,25 175,55 C195,85 165,135 145,165 C105,195 55,175 35,135 C15,95 10,80 30,75 Z;
                M55,35 C115,5 155,45 165,95 C175,155 115,175 75,155 C35,135 15,95 25,65 C35,35 15,35 55,35 Z;
                M55,25 C115,5 145,55 155,105 C165,165 105,165 65,175 C25,185 35,115 35,75 C35,35 25,40 55,25 Z;
                M30,75 C70,15 130,25 175,55 C195,85 165,135 145,165 C105,195 55,175 35,135 C15,95 10,80 30,75 Z
              "
            />
          </path>
        </svg>
      </div>
    </div>
  );
}

export const GLOW_COLORS = ["bg-ch1", "bg-ch2", "bg-ch3", "bg-ch4", "bg-ch5", "bg-ch6"] as const;

export function PageGlows() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" style={{ 
      width: "calc(100vw - var(--scrollbar-width, 0px))",
      left: "50%",
      transform: "translateX(-50%)",
    }}>
      {/* Hero glows */}
      <div className="absolute top-[-5%] left-[-2vw] w-[600px] h-[600px] animate-float-1 ambient-glow-hero">
        <AmbientGlow colorClass="bg-ch4" className="w-full h-full" opacity={0.3} />
      </div>
      <div className="absolute top-[30%] right-[-5vw] w-[700px] h-[700px] animate-float-2 ambient-glow-hero">
        <AmbientGlow colorClass="bg-ch1" className="w-full h-full" opacity={0.3} />
      </div>
      <div className="absolute top-[10%] left-[20vw] w-[500px] h-[500px] animate-float-3 ambient-glow-hero">
        <AmbientGlow colorClass="bg-ch2" className="w-full h-full" opacity={0.25} />
      </div>
      <div className="absolute top-[-10%] right-[15vw] w-[550px] h-[550px] animate-float-4 ambient-glow-hero">
        <AmbientGlow colorClass="bg-ch5" className="w-full h-full" opacity={0.25} />
      </div>
      <div className="absolute bottom-[20%] left-[10vw] w-[450px] h-[450px] animate-float-5 ambient-glow-hero">
        <AmbientGlow colorClass="bg-ch3" className="w-full h-full" opacity={0.3} />
      </div>
      <div className="absolute bottom-[10%] right-[25vw] w-[480px] h-[480px] animate-float-6 ambient-glow-hero">
        <AmbientGlow colorClass="bg-ch6" className="w-full h-full" opacity={0.3} />
      </div>

      {/* Intro / Conceptos glows */}
      <div className="absolute top-[0px] left-[-5vw] w-[500px] h-[500px] animate-float-1 ambient-glow-intro">
        <AmbientGlow colorClass="bg-ch1" className="w-full h-full" opacity={0.3} />
      </div>
      <div className="absolute top-[20px] right-[-5vw] w-[600px] h-[600px] animate-float-2 ambient-glow-intro">
        <AmbientGlow colorClass="bg-ch4" className="w-full h-full" opacity={0.25} />
      </div>
      <div className="absolute top-[40%] left-[8vw] w-[450px] h-[450px] animate-float-3 ambient-glow-intro">
        <AmbientGlow colorClass="bg-ch5" className="w-full h-full" opacity={0.3} />
      </div>
      <div className="absolute top-[-20px] right-[10vw] w-[500px] h-[500px] animate-float-4 ambient-glow-intro">
        <AmbientGlow colorClass="bg-ch2" className="w-full h-full" opacity={0.3} />
      </div>
      <div className="absolute bottom-[20px] left-[20vw] w-[400px] h-[400px] animate-float-5 ambient-glow-intro">
        <AmbientGlow colorClass="bg-ch3" className="w-full h-full" opacity={0.3} />
      </div>
      <div className="absolute top-[30%] right-[25vw] w-[450px] h-[450px] animate-float-6 ambient-glow-intro">
        <AmbientGlow colorClass="bg-ch6" className="w-full h-full" opacity={0.3} />
      </div>

      {/* Acto 0 glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[900px] h-[700px] animate-float-1 ambient-glow-acto0">
        <AmbientGlow colorClass="bg-primary" className="w-full h-full" opacity={0.2} />
      </div>
      <div className="absolute bottom-[5%] right-[-15%] w-[700px] h-[600px] animate-float-3 ambient-glow-acto0">
        <AmbientGlow colorClass="bg-primary" className="w-full h-full" opacity={0.15} />
      </div>
      <div className="absolute top-[30%] left-[30%] w-[500px] h-[500px] animate-float-5 ambient-glow-acto0">
        <AmbientGlow colorClass="bg-primary" className="w-full h-full" opacity={0.12} />
      </div>

      {/* Acto 1 glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[900px] h-[700px] animate-float-1 ambient-glow-acto1">
        <AmbientGlow colorClass="bg-ch1" className="w-full h-full" opacity={0.25} />
      </div>
      <div className="absolute bottom-[5%] right-[-15%] w-[950px] h-[700px] animate-float-2 ambient-glow-acto1">
        <AmbientGlow colorClass="bg-ch1" className="w-full h-full" opacity={0.25} />
      </div>
      <div className="absolute top-[20%] left-[25%] w-[650px] h-[550px] animate-float-3 ambient-glow-acto1">
        <AmbientGlow colorClass="bg-ch1" className="w-full h-full" opacity={0.18} />
      </div>
      <div className="absolute top-[40%] right-[-8%] w-[700px] h-[600px] animate-float-4 ambient-glow-acto1">
        <AmbientGlow colorClass="bg-ch1" className="w-full h-full" opacity={0.18} />
      </div>

      {/* Acto 2 glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[900px] h-[700px] animate-float-2 ambient-glow-acto2">
        <AmbientGlow colorClass="bg-ch2" className="w-full h-full" opacity={0.25} />
      </div>
      <div className="absolute bottom-[5%] right-[-15%] w-[950px] h-[700px] animate-float-3 ambient-glow-acto2">
        <AmbientGlow colorClass="bg-ch2" className="w-full h-full" opacity={0.25} />
      </div>
      <div className="absolute top-[20%] left-[25%] w-[650px] h-[550px] animate-float-4 ambient-glow-acto2">
        <AmbientGlow colorClass="bg-ch2" className="w-full h-full" opacity={0.18} />
      </div>
      <div className="absolute top-[40%] right-[-8%] w-[700px] h-[600px] animate-float-5 ambient-glow-acto2">
        <AmbientGlow colorClass="bg-ch2" className="w-full h-full" opacity={0.18} />
      </div>

      {/* Acto 3 glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[900px] h-[700px] animate-float-3 ambient-glow-acto3">
        <AmbientGlow colorClass="bg-ch3" className="w-full h-full" opacity={0.25} />
      </div>
      <div className="absolute bottom-[5%] right-[-15%] w-[950px] h-[700px] animate-float-4 ambient-glow-acto3">
        <AmbientGlow colorClass="bg-ch3" className="w-full h-full" opacity={0.25} />
      </div>
      <div className="absolute top-[20%] left-[25%] w-[650px] h-[550px] animate-float-5 ambient-glow-acto3">
        <AmbientGlow colorClass="bg-ch3" className="w-full h-full" opacity={0.18} />
      </div>
      <div className="absolute top-[40%] right-[-8%] w-[700px] h-[600px] animate-float-6 ambient-glow-acto3">
        <AmbientGlow colorClass="bg-ch3" className="w-full h-full" opacity={0.18} />
      </div>

      {/* Acto 4 glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[900px] h-[700px] animate-float-4 ambient-glow-acto4">
        <AmbientGlow colorClass="bg-ch4" className="w-full h-full" opacity={0.25} />
      </div>
      <div className="absolute bottom-[5%] right-[-15%] w-[950px] h-[700px] animate-float-5 ambient-glow-acto4">
        <AmbientGlow colorClass="bg-ch4" className="w-full h-full" opacity={0.25} />
      </div>
      <div className="absolute top-[20%] left-[25%] w-[650px] h-[550px] animate-float-6 ambient-glow-acto4">
        <AmbientGlow colorClass="bg-ch4" className="w-full h-full" opacity={0.18} />
      </div>
      <div className="absolute top-[40%] right-[-8%] w-[700px] h-[600px] animate-float-1 ambient-glow-acto4">
        <AmbientGlow colorClass="bg-ch4" className="w-full h-full" opacity={0.18} />
      </div>

      {/* Acto 5 glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[900px] h-[700px] animate-float-5 ambient-glow-acto5">
        <AmbientGlow colorClass="bg-ch5" className="w-full h-full" opacity={0.25} />
      </div>
      <div className="absolute bottom-[5%] right-[-15%] w-[950px] h-[700px] animate-float-6 ambient-glow-acto5">
        <AmbientGlow colorClass="bg-ch5" className="w-full h-full" opacity={0.25} />
      </div>
      <div className="absolute top-[20%] left-[25%] w-[650px] h-[550px] animate-float-1 ambient-glow-acto5">
        <AmbientGlow colorClass="bg-ch5" className="w-full h-full" opacity={0.18} />
      </div>
      <div className="absolute top-[40%] right-[-8%] w-[700px] h-[600px] animate-float-2 ambient-glow-acto5">
        <AmbientGlow colorClass="bg-ch5" className="w-full h-full" opacity={0.18} />
      </div>

      {/* Acto 6 glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[900px] h-[700px] animate-float-6 ambient-glow-acto6">
        <AmbientGlow colorClass="bg-ch6" className="w-full h-full" opacity={0.25} />
      </div>
      <div className="absolute bottom-[5%] right-[-15%] w-[950px] h-[700px] animate-float-1 ambient-glow-acto6">
        <AmbientGlow colorClass="bg-ch6" className="w-full h-full" opacity={0.25} />
      </div>
      <div className="absolute top-[20%] left-[25%] w-[650px] h-[550px] animate-float-2 ambient-glow-acto6">
        <AmbientGlow colorClass="bg-ch6" className="w-full h-full" opacity={0.18} />
      </div>
      <div className="absolute top-[40%] right-[-8%] w-[700px] h-[600px] animate-float-3 ambient-glow-acto6">
        <AmbientGlow colorClass="bg-ch6" className="w-full h-full" opacity={0.18} />
      </div>
    </div>
  );
}

/**
 * GlobalGlows — 6 floating color blobs always visible on every page.
 * No scroll-driven animation: opacity is always on.
 * These are the same visual style as the StoryMode hero section glows.
 */
export function GlobalGlows() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{
        width: "calc(100vw - var(--scrollbar-width, 0px))",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <div className="absolute top-[-5%] left-[-2vw] w-[600px] h-[600px] animate-float-1">
        <AmbientGlow colorClass="bg-ch4" className="w-full h-full" opacity={0.28} />
      </div>
      <div className="absolute top-[30%] right-[-5vw] w-[700px] h-[700px] animate-float-2">
        <AmbientGlow colorClass="bg-ch1" className="w-full h-full" opacity={0.28} />
      </div>
      <div className="absolute top-[10%] left-[20vw] w-[500px] h-[500px] animate-float-3">
        <AmbientGlow colorClass="bg-ch2" className="w-full h-full" opacity={0.22} />
      </div>
      <div className="absolute top-[-10%] right-[15vw] w-[550px] h-[550px] animate-float-4">
        <AmbientGlow colorClass="bg-ch5" className="w-full h-full" opacity={0.22} />
      </div>
      <div className="absolute bottom-[20%] left-[10vw] w-[450px] h-[450px] animate-float-5">
        <AmbientGlow colorClass="bg-ch3" className="w-full h-full" opacity={0.28} />
      </div>
      <div className="absolute bottom-[10%] right-[25vw] w-[480px] h-[480px] animate-float-6">
        <AmbientGlow colorClass="bg-ch6" className="w-full h-full" opacity={0.28} />
      </div>
    </div>
  );
}
