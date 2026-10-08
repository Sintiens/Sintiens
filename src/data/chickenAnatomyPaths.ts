export interface AnatomicalPaths {
  body: string;
  head: {
    comb: string;
    wattle: string;
    beakUpper: string;
    beakLower: string;
    beak: string;
    nares: { x1: number; y1: number; x2: number; y2: number };
    eye: { cx: number; cy: number; r: number };
  };
  wing: string;
  wingCoverts: string[];
  tailFeathers: string[];
  breast: string;
  skeleton: {
    spine: string;
    femur: string;
    tibia: string;
    metatarsus: string;
    digits: string;
    keel?: string;
    pelvis?: string;
    farLeg?: {
      femur: string;
      tibia: string;
      metatarsus: string;
      digits: string;
    };
  };
  heart: {
    main: string;
    rv?: string;
    ascites?: string;
    lungs?: string;
  };
  centerOfGravity: {
    cx: number;
    cy: number;
    plumbLineY: number;
    stabilityStatus: "balanced" | "stressed" | "unstable" | "collapsed";
    torqueOffsetPx: number;
  };
  pododermatitis?: {
    footpad: { cx: number; cy: number; r: number };
    hock?: { cx: number; cy: number; r: number };
  };
  myopathyStripes?: string[];
  groundClearanceMm: number;
  breastYieldPercent: number;
}

/**
 * 1957: Cepa Histórica (Athens-Canadian Randombred, 905 g a 56 días)
 * Proporciones naturales ancestrales, postura erguida y atlética.
 * Suelo unificado a y = 210. Gran espacio libre al suelo (56 mm).
 */
export const chickenPaths1957: AnatomicalPaths = {
  body: `M 86 70 
         C 86 60, 94 54, 106 54 
         C 118 54, 126 62, 130 72 
         C 136 86, 146 102, 160 110 
         C 176 118, 194 120, 206 116 
         C 214 108, 224 90, 232 82 
         C 234 90, 230 106, 226 114 
         C 222 122, 214 132, 204 138 
         C 190 146, 174 150, 158 152 
         C 144 154, 130 152, 120 146 
         C 108 140, 100 130, 96 118 
         C 92 106, 92 94, 90 86 
         C 88 80, 86 74, 86 70 Z`,
  head: {
    comb: `M 96 55 
           C 96 46, 99 40, 102 38 
           C 104 43, 107 36, 110 36 
           C 113 41, 116 37, 119 39 
           C 122 44, 125 42, 127 45 
           C 128 50, 127 56, 125 61 
           C 119 60, 109 57, 96 55 Z`,
    wattle: `M 88 82 
             C 83 86, 81 94, 85 100 
             C 89 104, 94 102, 95 96 
             C 96 90, 94 84, 88 82 Z`,
    beakUpper: `M 86 71 C 78 72, 66 74, 60 77 C 68 80, 76 81, 86 80 Z`,
    beakLower: `M 85 79 C 75 80, 68 80, 64 78 C 70 82, 78 83, 86 82 Z`,
    beak: `M 86 71 C 78 72, 66 74, 60 77 C 68 80, 76 81, 86 80 Z M 85 79 C 75 80, 68 80, 64 78 C 70 82, 78 83, 86 82 Z`,
    nares: { x1: 80, y1: 74, x2: 76, y2: 75 },
    eye: { cx: 100, cy: 68, r: 3.2 }
  },
  wing: `M 122 100 
         C 138 96, 166 102, 184 114 
         C 194 122, 196 132, 190 136 
         C 176 142, 150 140, 132 128 
         C 122 120, 118 110, 122 100 Z`,
  wingCoverts: [
    `M 132 106 C 146 104, 168 110, 180 120`,
    `M 138 116 C 152 114, 172 122, 184 130`
  ],
  tailFeathers: [
    `M 206 116 C 216 104, 228 88, 236 80 C 232 94, 226 110, 220 120`,
    `M 210 122 C 220 112, 232 100, 238 92 C 234 104, 228 118, 222 126`,
    `M 214 128 C 222 122, 230 114, 236 108 C 232 118, 226 128, 218 134`
  ],
  breast: `M 92 86 
           C 90 96, 90 108, 94 120 
           C 98 132, 108 142, 120 146 
           C 124 138, 126 126, 124 114 
           C 120 104, 112 92, 92 86 Z`,
  skeleton: {
    spine: `M 104 66 C 112 78, 126 96, 144 106 C 162 114, 182 116, 198 118`,
    keel: `M 104 106 C 102 120, 104 134, 112 144`,
    pelvis: `M 160 112 C 172 114, 184 116, 194 118`,
    femur: `M 160 124 L 146 148`,
    tibia: `M 146 148 L 156 178`,
    metatarsus: `M 156 178 L 154 210`,
    digits: `M 154 210 L 126 210 M 154 210 L 128 206 M 154 210 L 130 213 M 154 210 L 168 210`,
    farLeg: {
      femur: `M 172 122 L 160 146`,
      tibia: `M 160 146 L 168 176`,
      metatarsus: `M 168 176 L 166 210`,
      digits: `M 166 210 L 140 210 M 166 210 L 142 206 M 166 210 L 178 210`
    }
  },
  heart: {
    main: `M 120 116 C 114 110, 108 114, 108 122 C 108 132, 120 138, 120 138 C 120 138, 132 132, 132 122 C 132 114, 126 110, 120 116 Z`,
    lungs: `M 126 100 C 136 96, 150 100, 152 110 C 144 112, 130 110, 126 100 Z`
  },
  centerOfGravity: {
    cx: 154,
    cy: 130,
    plumbLineY: 210,
    stabilityStatus: "balanced",
    torqueOffsetPx: 0
  },
  pododermatitis: {
    footpad: { cx: 154, cy: 209, r: 0 },
    hock: { cx: 156, cy: 178, r: 0 }
  },
  groundClearanceMm: 56,
  breastYieldPercent: 11.6
};

/**
 * 1978: Cepa Comercial 1978 (1.808 g a 56 días)
 * Masa muscular aumentada (+100%), cuerpo más robusto, pecho más lleno.
 * Luz al suelo: 42 mm.
 */
export const chickenPaths1978: AnatomicalPaths = {
  body: `M 84 70 
         C 84 60, 92 54, 104 54 
         C 116 54, 124 62, 128 72 
         C 134 86, 144 102, 158 112 
         C 176 120, 198 122, 210 118 
         C 218 110, 228 92, 236 84 
         C 238 92, 234 108, 228 118 
         C 222 128, 212 138, 200 146 
         C 184 154, 164 162, 146 166 
         C 130 168, 114 162, 104 152 
         C 92 140, 86 126, 86 112 
         C 86 100, 88 88, 88 82 
         C 86 78, 84 74, 84 70 Z`,
  head: {
    comb: `M 94 55 
           C 94 45, 97 39, 100 37 
           C 102 42, 105 35, 108 35 
           C 111 40, 114 36, 117 38 
           C 120 43, 123 41, 125 44 
           C 126 49, 125 55, 123 60 
           C 117 59, 107 56, 94 55 Z`,
    wattle: `M 86 82 
             C 81 86, 79 94, 83 100 
             C 87 104, 92 102, 93 96 
             C 94 90, 92 84, 86 82 Z`,
    beakUpper: `M 84 71 C 76 72, 64 74, 58 77 C 66 80, 74 81, 84 80 Z`,
    beakLower: `M 83 79 C 73 80, 66 80, 62 78 C 68 82, 76 83, 84 82 Z`,
    beak: `M 84 71 C 76 72, 64 74, 58 77 C 66 80, 74 81, 84 80 Z M 83 79 C 73 80, 66 80, 62 78 C 68 82, 76 83, 84 82 Z`,
    nares: { x1: 78, y1: 74, x2: 74, y2: 75 },
    eye: { cx: 98, cy: 68, r: 3.2 }
  },
  wing: `M 118 102 
         C 136 96, 168 104, 186 118 
         C 196 126, 196 136, 190 140 
         C 174 146, 146 144, 128 130 
         C 118 122, 114 112, 118 102 Z`,
  wingCoverts: [
    `M 128 108 C 144 104, 168 112, 182 122`,
    `M 134 118 C 150 116, 172 124, 186 132`
  ],
  tailFeathers: [
    `M 210 118 C 220 106, 232 90, 240 82 C 236 96, 230 112, 224 122`,
    `M 214 124 C 224 114, 236 102, 242 94 C 238 106, 232 120, 226 128`
  ],
  breast: `M 88 86 
           C 80 100, 78 116, 82 132 
           C 88 146, 100 156, 116 160 
           C 122 150, 124 136, 120 122 
           C 114 108, 104 94, 88 86 Z`,
  skeleton: {
    spine: `M 102 66 C 110 78, 124 96, 142 108 C 160 116, 180 120, 196 122`,
    keel: `M 98 108 C 94 124, 96 142, 104 154`,
    pelvis: `M 160 114 C 172 116, 184 118, 194 120`,
    femur: `M 160 128 L 144 152`,
    tibia: `M 144 152 L 154 180`,
    metatarsus: `M 154 180 L 152 210`,
    digits: `M 152 210 L 124 210 M 152 210 L 126 206 M 152 210 L 128 213 M 152 210 L 166 210`,
    farLeg: {
      femur: `M 172 126 L 158 150`,
      tibia: `M 158 150 L 166 178`,
      metatarsus: `M 166 178 L 164 210`,
      digits: `M 164 210 L 138 210 M 164 210 L 140 206 M 164 210 L 176 210`
    }
  },
  heart: {
    main: `M 118 118 C 112 112, 106 116, 106 124 C 106 134, 118 140, 118 140 C 118 140, 130 134, 130 124 C 130 116, 124 112, 118 118 Z`,
    lungs: `M 124 102 C 134 98, 148 102, 150 112 C 142 114, 128 112, 124 102 Z`
  },
  centerOfGravity: {
    cx: 144,
    cy: 134,
    plumbLineY: 210,
    stabilityStatus: "stressed",
    torqueOffsetPx: 10
  },
  pododermatitis: {
    footpad: { cx: 152, cy: 209, r: 1.5 },
    hock: { cx: 154, cy: 180, r: 1.2 }
  },
  groundClearanceMm: 42,
  breastYieldPercent: 15.2
};

/**
 * 2005: Ross 308 (4.202 g a 56 días)
 * Hipertrofia extrema (+364%), pecho descolgado hacia el suelo, discondroplasia tibial y varus.
 * Luz al suelo: 18 mm.
 */
export const chickenPaths2005: AnatomicalPaths = {
  body: `M 82 72 
         C 82 62, 88 56, 100 56 
         C 112 56, 120 62, 124 72 
         C 130 88, 142 104, 158 114 
         C 178 124, 204 128, 218 124 
         C 226 116, 236 102, 242 94 
         C 244 104, 238 120, 230 130 
         C 220 144, 204 156, 188 164 
         C 166 174, 138 186, 112 190 
         C 88 194, 64 186, 50 168 
         C 40 152, 42 132, 52 114 
         C 64 96, 78 84, 82 72 Z`,
  head: {
    comb: `M 92 57 
           C 92 46, 95 40, 98 38 
           C 101 43, 105 37, 108 37 
           C 112 43, 115 39, 118 41 
           C 121 47, 122 54, 120 60 
           C 114 59, 104 57, 92 57 Z`,
    wattle: `M 80 84 
             C 74 88, 70 98, 76 104 
             C 82 108, 88 104, 90 96 
             C 90 90, 86 86, 80 84 Z`,
    beakUpper: `M 82 73 C 74 74, 62 76, 56 79 C 64 82, 72 83, 82 82 Z`,
    beakLower: `M 80 81 C 70 82, 64 82, 60 80 C 66 84, 74 85, 81 84 Z`,
    beak: `M 82 73 C 74 74, 62 76, 56 79 C 64 82, 72 83, 82 82 Z M 80 81 C 70 82, 64 82, 60 80 C 66 84, 74 85, 81 84 Z`,
    nares: { x1: 76, y1: 76, x2: 72, y2: 77 },
    eye: { cx: 96, cy: 70, r: 3.3 }
  },
  wing: `M 114 106 
         C 134 98, 170 106, 190 122 
         C 200 134, 196 146, 186 150 
         C 166 154, 134 146, 118 130 
         C 110 122, 108 114, 114 106 Z`,
  wingCoverts: [
    `M 124 112 C 142 108, 168 116, 184 128`,
    `M 130 122 C 148 120, 170 130, 184 140`
  ],
  tailFeathers: [
    `M 218 124 C 226 114, 236 100, 242 94 C 238 106, 232 120, 226 130`,
    `M 222 132 C 230 122, 238 110, 242 104 C 238 116, 232 126, 224 136`
  ],
  breast: `M 78 88 
           C 62 104, 48 126, 48 148 
           C 50 170, 70 188, 96 192 
           C 116 178, 120 154, 118 132 
           C 112 114, 100 96, 78 88 Z`,
  skeleton: {
    spine: `M 98 68 C 108 82, 124 102, 144 114 C 166 124, 192 128, 212 126`,
    keel: `M 88 114 C 74 134, 66 156, 74 176`,
    pelvis: `M 168 120 C 184 124, 198 126, 208 126`,
    femur: `M 168 136 L 138 162`,
    tibia: `M 138 162 C 132 172, 140 182, 150 188`,
    metatarsus: `M 150 188 L 148 210`,
    digits: `M 148 210 L 118 210 M 148 210 L 120 206 M 148 210 L 122 214 M 148 210 L 164 210`,
    farLeg: {
      femur: `M 182 134 L 162 160`,
      tibia: `M 162 160 C 168 170, 174 178, 178 186`,
      metatarsus: `M 178 186 L 178 210`,
      digits: `M 178 210 L 152 210 M 178 210 L 154 206 M 178 210 L 192 210`
    }
  },
  heart: {
    main: `M 116 128 C 106 116, 94 120, 94 132 C 94 146, 116 154, 116 154 C 116 154, 134 146, 134 132 C 134 120, 126 116, 116 128 Z`,
    rv: `M 94 132 C 86 140, 88 152, 104 156 C 98 150, 96 140, 94 132 Z`,
    ascites: `M 110 172 C 124 182, 148 182, 162 174 C 152 186, 122 186, 110 172 Z`,
    lungs: `M 122 112 C 134 108, 148 112, 150 122 C 142 124, 128 122, 122 112 Z`
  },
  centerOfGravity: {
    cx: 112,
    cy: 142,
    plumbLineY: 210,
    stabilityStatus: "unstable",
    torqueOffsetPx: 36
  },
  pododermatitis: {
    footpad: { cx: 148, cy: 209, r: 3.5 },
    hock: { cx: 150, cy: 188, r: 2.5 }
  },
  myopathyStripes: [
    `M 58 136 C 72 146, 90 154, 104 156`,
    `M 54 150 C 68 160, 86 168, 100 170`,
    `M 60 164 C 74 172, 90 178, 104 180`
  ],
  groundClearanceMm: 18,
  breastYieldPercent: 21.4
};

/**
 * 2025: Cepa Ultra-Rápida Moderna (>4.500 g a 56 días)
 * Pecho descomunal (+450%) que descansa a milímetros del suelo, quilla desviada por compresión,
 * ascitis abdominal severa, pododermatitis grado 3 en almohadillas y tarsos.
 * Luz al suelo: 6 mm (colapso físico).
 */
export const chickenPaths2025: AnatomicalPaths = {
  body: `M 80 72 
         C 80 62, 86 56, 96 56 
         C 106 56, 114 62, 118 72 
         C 126 88, 138 104, 154 114 
         C 176 126, 206 130, 222 126 
         C 230 118, 240 104, 246 96 
         C 248 106, 242 122, 234 132 
         C 224 146, 208 158, 192 166 
         C 170 178, 142 192, 112 198 
         C 86 204, 56 198, 42 174 
         C 32 156, 34 132, 46 112 
         C 58 92, 74 80, 80 72 Z`,
  head: {
    comb: `M 90 57 
           C 90 44, 94 38, 97 36 
           C 100 42, 104 36, 108 36 
           C 112 42, 116 38, 119 42 
           C 122 48, 122 56, 120 62 
           C 112 60, 102 58, 90 57 Z`,
    wattle: `M 78 84 
             C 72 88, 68 98, 74 104 
             C 80 108, 86 104, 88 96 
             C 88 90, 84 86, 78 84 Z`,
    beakUpper: `M 80 73 C 72 74, 60 76, 54 79 C 62 82, 70 83, 80 82 Z`,
    beakLower: `M 78 81 C 68 82, 62 82, 58 80 C 64 84, 72 85, 79 84 Z`,
    beak: `M 80 73 C 72 74, 60 76, 54 79 C 62 82, 70 83, 80 82 Z M 78 81 C 68 82, 62 82, 58 80 C 64 84, 72 85, 79 84 Z`,
    nares: { x1: 74, y1: 76, x2: 70, y2: 77 },
    eye: { cx: 94, cy: 70, r: 3.4 }
  },
  wing: `M 112 108 
         C 134 100, 172 108, 192 124 
         C 202 136, 198 148, 188 152 
         C 168 156, 134 148, 118 132 
         C 110 124, 108 116, 112 108 Z`,
  wingCoverts: [
    `M 122 114 C 140 110, 170 118, 186 130`,
    `M 128 124 C 146 122, 172 132, 186 142`
  ],
  tailFeathers: [
    `M 222 126 C 230 116, 240 102, 246 96 C 242 108, 236 122, 230 132`,
    `M 226 134 C 234 124, 242 112, 246 106 C 242 118, 236 128, 228 138`
  ],
  breast: `M 76 88 
           C 56 104, 40 128, 40 152 
           C 42 176, 60 196, 90 202 
           C 112 186, 116 160, 114 136 
           C 108 116, 96 96, 76 88 Z`,
  skeleton: {
    spine: `M 96 68 C 106 82, 124 102, 144 114 C 168 124, 196 128, 218 126`,
    keel: `M 84 116 C 68 138, 58 162, 68 186`,
    pelvis: `M 172 122 C 188 126, 202 128, 214 128`,
    femur: `M 170 138 L 136 164`,
    tibia: `M 136 164 C 130 174, 138 184, 148 190`,
    metatarsus: `M 148 190 L 146 210`,
    digits: `M 146 210 L 114 210 M 146 210 L 116 206 M 146 210 L 118 214 M 146 210 L 164 210`,
    farLeg: {
      femur: `M 184 136 L 162 162`,
      tibia: `M 162 162 C 168 172, 176 180, 180 188`,
      metatarsus: `M 180 188 L 180 210`,
      digits: `M 180 210 L 152 210 M 180 210 L 154 206 M 180 210 L 194 210`
    }
  },
  heart: {
    main: `M 114 130 C 104 118, 92 122, 92 134 C 92 148, 114 156, 114 156 C 114 156, 134 148, 134 134 C 134 122, 124 118, 114 130 Z`,
    rv: `M 92 134 C 84 142, 86 154, 102 158 C 96 152, 94 142, 92 134 Z`,
    ascites: `M 106 178 C 122 190, 150 190, 168 180 C 156 196, 122 196, 106 178 Z`,
    lungs: `M 120 114 C 134 110, 150 114, 152 124 C 144 126, 128 124, 120 114 Z`
  },
  centerOfGravity: {
    cx: 100,
    cy: 146,
    plumbLineY: 210,
    stabilityStatus: "collapsed",
    torqueOffsetPx: 46
  },
  pododermatitis: {
    footpad: { cx: 146, cy: 209, r: 4.8 },
    hock: { cx: 148, cy: 190, r: 3.8 }
  },
  myopathyStripes: [
    `M 52 138 C 66 148, 86 158, 100 160`,
    `M 48 152 C 62 162, 82 170, 96 174`,
    `M 54 166 C 68 174, 86 180, 102 182`,
    `M 60 178 C 74 184, 90 188, 104 190`
  ],
  groundClearanceMm: 6,
  breastYieldPercent: 24.8
};
