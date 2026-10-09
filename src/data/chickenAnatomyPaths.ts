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
  plumageLeg?: {
    fluffNear: string;
    fluffFar: string;
    drumstickNear: string;
    drumstickFar: string;
    metatarsusNear: string;
    metatarsusFar: string;
    digitsNear: string;
    digitsFar: string;
  };
  skeleton: {
    spine: string;
    ribs?: string[];
    coracoid?: string;
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
 * Proporciones zootécnicas naturales y atléticas.
 * Postura erguida, quilla recta y alta, gran luz al suelo (56 mm).
 * Centro de gravedad balanceado sobre la base podal.
 */
export const chickenPaths1957: AnatomicalPaths = {
  body: `M 52 70
    C 60 64, 70 74, 76 58
    C 82 53, 86 48, 94 48
    C 102 48, 106 50, 106 52
    C 112 58, 114 64, 118 68
    C 126 78, 130 82, 136 88
    C 152 96, 172 102, 196 106
    C 210 108, 226 94, 240 72
    C 242 84, 238 102, 230 116
    C 220 134, 204 142, 186 148
    C 164 152, 146 152, 126 154
    C 106 154, 86 136, 74 118
    C 72 96, 74 106, 76 98
    C 76 90, 74 88, 73 84
    C 73 80, 71 76, 72 74
    C 66 75, 58 74, 52 70 Z`,
  head: {
    comb: `M 84 50
           C 90 45, 96 44, 100 48
           C 104 44, 110 45, 114 48
           C 116 45, 120 46, 124 50
           C 118 51, 104 50, 84 50 Z`,
    wattle: `M 72 74
             C 67 80, 66 88, 71 92
             C 76 94, 80 90, 78 82
             C 77 77, 74 74, 72 74 Z`,
    beakUpper: `M 76 58 C 66 61, 58 65, 52 70 C 60 71, 68 71.5, 75 70 Z`,
    beakLower: `M 75 70 C 67 71, 60 71.5, 54 70.5 C 62 73, 70 73.5, 72 74 Z`,
    beak: `M 76 58 C 66 61, 58 65, 52 70 C 60 71, 68 71.5, 75 70 Z M 75 70 C 67 71, 60 71.5, 54 70.5 C 62 73, 70 73.5, 72 74 Z`,
    nares: { x1: 68, y1: 67, x2: 64, y2: 68 },
    eye: { cx: 84, cy: 62, r: 3.5 }
  },
  wing: `M 136 88
         C 156 86, 186 94, 204 108
         C 212 116, 208 128, 198 132
         C 178 136, 150 130, 134 116
         C 126 108, 128 98, 136 88 Z`,
  wingCoverts: [
    `M 144 94 C 164 92, 186 100, 198 112`,
    `M 150 104 C 170 102, 192 112, 202 122`
  ],
  tailFeathers: [
    `M 226 112 C 240 94, 252 78, 260 72 C 256 86, 250 104, 240 116`,
    `M 230 118 C 242 104, 254 90, 262 82 C 258 96, 252 110, 244 120`,
    `M 234 124 C 244 114, 254 104, 260 96 C 256 106, 250 116, 242 124`
  ],
  plumageLeg: {
    fluffNear: `M 142 134 C 134 142, 138 152, 150 156 C 158 156, 166 148, 166 140 C 166 130, 154 128, 142 134 Z`,
    fluffFar: `M 160 136 C 156 144, 160 150, 168 152 C 172 152, 178 146, 178 138 Z`,
    drumstickNear: `M 142 134 C 134 146, 138 160, 150 172 C 156 172, 166 164, 166 150 C 166 136, 154 128, 142 134 Z`,
    drumstickFar: `M 160 136 C 156 146, 160 158, 168 168 C 172 168, 178 162, 178 150 Z`,
    metatarsusNear: `M 150 172 L 148 210`,
    metatarsusFar: `M 168 168 L 166 210`,
    digitsNear: `M 148 210 L 120 210 M 148 210 L 123 206 M 148 210 L 125 213 M 148 210 L 162 210`,
    digitsFar: `M 166 210 L 138 210 M 166 210 L 140 206 M 166 210 L 142 214 M 166 210 L 178 210`
  },
  breast: `M 84 80 C 82 90, 82 102, 86 114 C 90 126, 98 138, 108 142 C 114 134, 116 122, 114 110 C 110 98, 102 86, 84 80 Z`,
  skeleton: {
    spine: `M 106 60 C 118 72, 132 86, 152 96 C 170 108, 194 110, 216 112`,
    pelvis: `M 166 106 C 182 108, 198 109, 214 110`,
    coracoid: `M 116 96 L 96 114`,
    keel: `M 96 102 C 92 116, 94 130, 102 144`,
    ribs: [
      `M 130 98 C 124 110, 116 124, 106 134`,
      `M 138 101 C 132 114, 124 128, 114 138`,
      `M 146 104 C 140 118, 132 132, 122 142`
    ],
    femur: `M 164 116 L 146 142`,
    tibia: `M 146 142 L 150 172`,
    metatarsus: `M 150 172 L 148 210`,
    digits: `M 148 210 L 120 210 M 148 210 L 123 206 M 148 210 L 125 213 M 148 210 L 162 210`,
    farLeg: {
      femur: `M 174 114 L 160 138`,
      tibia: `M 160 138 L 168 168`,
      metatarsus: `M 168 168 L 166 210`,
      digits: `M 166 210 L 138 210 M 166 210 L 140 206 M 166 210 L 142 214 M 166 210 L 178 210`
    }
  },
  heart: {
    main: `M 114 114 C 121 112, 128 117, 128 125 C 128 136, 119 145, 114 147 C 109 145, 103 136, 104 126 C 104 118, 109 113, 114 114 Z`,
    lungs: `M 122 92 C 132 88, 146 92, 148 102 C 140 104, 126 102, 122 92 Z`
  },
  centerOfGravity: {
    cx: 152,
    cy: 126,
    plumbLineY: 210,
    stabilityStatus: "balanced",
    torqueOffsetPx: 0
  },
  pododermatitis: {
    footpad: { cx: 148, cy: 209, r: 0 },
    hock: { cx: 150, cy: 172, r: 0 }
  },
  groundClearanceMm: 56,
  breastYieldPercent: 11.6
};

/**
 * 1978: Cepa Comercial 1978 (1.808 g a 56 días)
 * Masa muscular duplicada (+100%), tórax más ancho, primeros signos de tensión ósea.
 * Luz al suelo: 42 mm. Centro de gravedad ligeramente desplazado hacia delante.
 */
export const chickenPaths1978: AnatomicalPaths = {
  body: `M 50 73
    C 58 67, 68 77, 74 61
    C 80 56, 84 51, 92 51
    C 100 51, 104 53, 104 55
    C 110 61, 112 67, 116 71
    C 124 81, 128 85, 134 91
    C 152 98, 172 104, 196 108
    C 210 110, 226 98, 240 80
    C 242 92, 238 110, 230 124
    C 220 138, 204 146, 186 152
    C 164 156, 146 166, 114 168
    C 94 168, 76 148, 62 124
    C 62 102, 68 110, 72 100
    C 72 92, 70 88, 71 85
    C 71 81, 69 77, 70 75
    C 64 76, 56 75, 50 73 Z`,
  head: {
    comb: `M 82 53
           C 88 48, 94 47, 98 51
           C 102 47, 108 48, 112 51
           C 114 48, 118 49, 122 53
           C 116 54, 102 53, 82 53 Z`,
    wattle: `M 70 77
             C 65 83, 64 91, 69 95
             C 74 97, 78 93, 76 85
             C 75 80, 72 77, 70 77 Z`,
    beakUpper: `M 74 61 C 64 64, 56 68, 50 73 C 58 74, 66 74.5, 73 73 Z`,
    beakLower: `M 73 73 C 65 74, 58 74.5, 52 73.5 C 60 76, 68 76.5, 70 77 Z`,
    beak: `M 74 61 C 64 64, 56 68, 50 73 C 58 74, 66 74.5, 73 73 Z M 73 73 C 65 74, 58 74.5, 52 73.5 C 60 76, 68 76.5, 70 77 Z`,
    nares: { x1: 66, y1: 70, x2: 62, y2: 71 },
    eye: { cx: 82, cy: 65, r: 3.5 }
  },
  wing: `M 134 91
         C 154 88, 184 96, 202 110
         C 210 118, 206 130, 196 134
         C 176 138, 148 132, 132 118
         C 124 110, 126 100, 134 91 Z`,
  wingCoverts: [
    `M 142 97 C 162 95, 184 103, 196 115`,
    `M 148 107 C 168 105, 190 115, 200 125`
  ],
  tailFeathers: [
    `M 226 114 C 238 98, 250 86, 258 80 C 254 94, 248 110, 238 122`,
    `M 230 120 C 240 108, 252 96, 260 90 C 256 102, 250 116, 242 126`
  ],
  plumageLeg: {
    fluffNear: `M 142 142 C 134 150, 138 160, 150 164 C 158 164, 166 156, 166 148 C 166 138, 154 136, 142 142 Z`,
    fluffFar: `M 160 144 C 156 152, 160 158, 168 160 C 172 160, 178 154, 178 146 Z`,
    drumstickNear: `M 142 142 C 134 154, 138 168, 150 176 C 156 176, 166 168, 166 154 C 166 140, 154 134, 142 142 Z`,
    drumstickFar: `M 160 144 C 156 154, 160 166, 168 172 C 172 172, 178 166, 178 154 Z`,
    metatarsusNear: `M 150 176 L 148 210`,
    metatarsusFar: `M 168 172 L 166 210`,
    digitsNear: `M 148 210 L 120 210 M 148 210 L 123 206 M 148 210 L 125 213 M 148 210 L 162 210`,
    digitsFar: `M 166 210 L 138 210 M 166 210 L 140 206 M 166 210 L 142 214 M 166 210 L 178 210`
  },
  breast: `M 80 80 C 72 94, 70 110, 74 126 C 80 140, 92 150, 106 154 C 112 144, 114 130, 110 116 C 104 102, 94 88, 80 80 Z`,
  skeleton: {
    spine: `M 104 63 C 116 75, 130 89, 150 99 C 168 110, 192 112, 214 114`,
    pelvis: `M 166 108 C 182 110, 198 111, 214 112`,
    coracoid: `M 116 98 L 94 116`,
    keel: `M 92 104 C 88 120, 90 138, 98 150`,
    ribs: [
      `M 130 100 C 124 112, 116 126, 106 136`,
      `M 138 103 C 132 116, 124 130, 114 140`,
      `M 146 106 C 140 120, 132 134, 122 144`
    ],
    femur: `M 164 118 L 146 144`,
    tibia: `M 146 144 L 150 176`,
    metatarsus: `M 150 176 L 148 210`,
    digits: `M 148 210 L 120 210 M 148 210 L 123 206 M 148 210 L 125 213 M 148 210 L 162 210`,
    farLeg: {
      femur: `M 174 116 L 160 140`,
      tibia: `M 160 140 L 168 172`,
      metatarsus: `M 168 172 L 166 210`,
      digits: `M 166 210 L 138 210 M 166 210 L 140 206 M 166 210 L 142 214 M 166 210 L 178 210`
    }
  },
  heart: {
    main: `M 114 116 C 121 114, 128 119, 128 127 C 128 138, 119 147, 114 149 C 109 147, 103 138, 104 128 C 104 120, 109 115, 114 116 Z`,
    lungs: `M 122 94 C 132 90, 146 94, 148 104 C 140 106, 126 104, 122 94 Z`
  },
  centerOfGravity: {
    cx: 142,
    cy: 130,
    plumbLineY: 210,
    stabilityStatus: "stressed",
    torqueOffsetPx: 10
  },
  pododermatitis: {
    footpad: { cx: 148, cy: 209, r: 1.5 },
    hock: { cx: 150, cy: 176, r: 1.2 }
  },
  groundClearanceMm: 42,
  breastYieldPercent: 15.2
};

/**
 * 2005: Ross 308 (4.202 g a 56 días)
 * Hipertrofia severa (+364%), pecho descolgado hacia el suelo (luz: 18 mm).
 * Deformación angular tibial (varus/valgus), estriado blanco (miopatía),
 * dilatación del ventrículo derecho y principio de ascitis abdominal.
 */
export const chickenPaths2005: AnatomicalPaths = {
  body: `M 48 76
    C 56 70, 66 80, 72 64
    C 78 59, 82 54, 90 54
    C 98 54, 102 56, 102 58
    C 108 64, 110 70, 114 74
    C 122 84, 126 88, 132 94
    C 152 100, 172 106, 196 110
    C 210 112, 226 102, 240 90
    C 242 102, 238 120, 230 130
    C 220 142, 204 150, 186 156
    C 164 162, 140 180, 96 192
    C 66 192, 48 166, 42 136
    C 42 110, 56 116, 62 104
    C 64 96, 68 90, 69 87
    C 69 83, 67 79, 68 77
    C 62 78, 54 77, 48 76 Z`,
  head: {
    comb: `M 80 56
           C 86 51, 92 50, 96 54
           C 100 50, 106 51, 110 54
           C 112 51, 116 52, 120 56
           C 114 57, 100 56, 80 56 Z`,
    wattle: `M 68 80
             C 63 86, 62 94, 67 98
             C 72 100, 76 96, 74 88
             C 73 83, 70 80, 68 80 Z`,
    beakUpper: `M 72 64 C 62 67, 54 71, 48 76 C 56 77, 64 77.5, 71 76 Z`,
    beakLower: `M 71 76 C 63 77, 56 77.5, 50 76.5 C 58 79, 66 79.5, 68 80 Z`,
    beak: `M 72 64 C 62 67, 54 71, 48 76 C 56 77, 64 77.5, 71 76 Z M 71 76 C 63 77, 56 77.5, 50 76.5 C 58 79, 66 79.5, 68 80 Z`,
    nares: { x1: 64, y1: 73, x2: 60, y2: 74 },
    eye: { cx: 80, cy: 68, r: 3.5 }
  },
  wing: `M 132 94
         C 152 90, 182 98, 200 112
         C 208 120, 204 132, 194 136
         C 174 140, 146 134, 130 120
         C 122 112, 124 102, 132 94 Z`,
  wingCoverts: [
    `M 140 100 C 160 98, 182 106, 194 118`,
    `M 146 110 C 166 108, 188 118, 198 128`
  ],
  tailFeathers: [
    `M 226 116 C 238 102, 250 92, 258 88 C 254 100, 248 114, 238 126`,
    `M 230 122 C 240 112, 252 102, 260 96 C 256 108, 250 120, 242 130`
  ],
  plumageLeg: {
    fluffNear: `M 138 152 C 128 162, 134 174, 146 182 C 156 182, 166 174, 166 162 C 166 148, 152 144, 138 152 Z`,
    fluffFar: `M 156 150 C 150 160, 154 170, 164 176 C 170 176, 178 170, 178 158 Z`,
    drumstickNear: `M 138 152 C 128 166, 134 180, 146 186 C 154 186, 164 178, 164 164 C 164 150, 150 144, 138 152 Z`,
    drumstickFar: `M 156 150 C 150 162, 154 176, 164 182 C 170 182, 178 174, 178 160 Z`,
    metatarsusNear: `M 146 186 L 144 210`,
    metatarsusFar: `M 164 182 L 164 210`,
    digitsNear: `M 144 210 L 116 210 M 144 210 L 118 206 M 144 210 L 120 214 M 144 210 L 160 210`,
    digitsFar: `M 164 210 L 138 210 M 164 210 L 140 206 M 164 210 L 142 214 M 164 210 L 178 210`
  },
  breast: `M 72 82 C 56 98, 42 120, 42 142 C 44 164, 64 182, 90 186 C 110 172, 114 148, 112 126 C 106 108, 94 90, 72 82 Z`,
  myopathyStripes: [
    `M 48 132 C 62 142, 82 152, 96 154`,
    `M 44 146 C 58 156, 78 164, 92 168`,
    `M 50 160 C 64 168, 82 174, 98 176`
  ],
  skeleton: {
    spine: `M 102 66 C 114 78, 128 92, 148 102 C 168 112, 192 114, 214 116`,
    pelvis: `M 166 110 C 182 112, 198 113, 214 114`,
    coracoid: `M 116 100 L 92 118`,
    keel: `M 84 108 C 70 128, 62 150, 70 170`,
    ribs: [
      `M 130 102 C 124 114, 116 128, 106 138`,
      `M 138 105 C 132 118, 124 132, 114 142`,
      `M 146 108 C 140 122, 132 136, 122 146`
    ],
    femur: `M 164 122 L 144 150`,
    tibia: `M 144 150 C 138 160, 144 172, 146 186`,
    metatarsus: `M 146 186 L 144 210`,
    digits: `M 144 210 L 116 210 M 144 210 L 118 206 M 144 210 L 120 214 M 144 210 L 160 210`,
    farLeg: {
      femur: `M 174 120 L 158 146`,
      tibia: `M 158 146 L 164 182`,
      metatarsus: `M 164 182 L 164 210`,
      digits: `M 164 210 L 138 210 M 164 210 L 140 206 M 164 210 L 142 214 M 164 210 L 178 210`
    }
  },
  heart: {
    main: `M 114 114 C 124 112, 134 118, 134 128 C 134 142, 122 152, 114 154 C 106 152, 94 142, 96 128 C 96 118, 106 112, 114 114 Z`,
    rv: `M 96 128 C 88 136, 90 146, 106 152 C 100 146, 97 138, 96 128 Z`,
    ascites: `M 104 168 C 120 180, 148 180, 166 170 C 154 186, 120 186, 104 168 Z`,
    lungs: `M 122 92 C 132 88, 146 92, 148 102 C 140 104, 126 102, 122 92 Z`
  },
  centerOfGravity: {
    cx: 118,
    cy: 138,
    plumbLineY: 210,
    stabilityStatus: "unstable",
    torqueOffsetPx: 34
  },
  pododermatitis: {
    footpad: { cx: 144, cy: 209, r: 3.2 },
    hock: { cx: 146, cy: 186, r: 2.2 }
  },
  groundClearanceMm: 18,
  breastYieldPercent: 21.4
};

/**
 * 2025: Cepa Ultra-Rápida Moderna (>4.500 g a 56 días)
 * Colapso biomecánico y alométrico:
 * Pecho desproporcionado que descansa a 6 mm del suelo, quilla esternal fracturada/deformada
 * por compresión continua, ascitis grave por fallo ventricular derecho y pododermatitis grado 3.
 * Luz al suelo: 6 mm. Offset de torque anterior: +46 px (imposible equilibrio bípedo estable).
 */
export const chickenPaths2025: AnatomicalPaths = {
  body: `M 46 78
    C 54 72, 64 82, 70 66
    C 76 61, 80 56, 88 56
    C 96 56, 100 58, 100 60
    C 106 66, 108 72, 112 76
    C 120 86, 124 90, 130 96
    C 152 102, 172 108, 196 112
    C 210 114, 226 104, 240 96
    C 242 108, 238 126, 230 136
    C 220 148, 204 156, 186 162
    C 164 168, 136 196, 82 204
    C 48 204, 34 172, 30 142
    C 30 114, 46 118, 54 106
    C 58 98, 62 92, 63 89
    C 63 85, 61 81, 62 79
    C 56 80, 48 79, 46 78 Z`,
  head: {
    comb: `M 78 58
           C 84 53, 90 52, 94 56
           C 98 52, 104 53, 108 56
           C 110 53, 114 54, 118 58
           C 112 59, 98 58, 78 58 Z`,
    wattle: `M 66 82
             C 61 88, 60 96, 65 100
             C 70 102, 74 98, 72 90
             C 71 85, 68 82, 66 82 Z`,
    beakUpper: `M 70 66 C 60 69, 52 73, 46 78 C 54 79, 62 79.5, 69 78 Z`,
    beakLower: `M 69 78 C 61 79, 54 79.5, 48 78.5 C 56 81, 64 81.5, 66 82 Z`,
    beak: `M 70 66 C 60 69, 52 73, 46 78 C 54 79, 62 79.5, 69 78 Z M 69 78 C 61 79, 54 79.5, 48 78.5 C 56 81, 64 81.5, 66 82 Z`,
    nares: { x1: 62, y1: 75, x2: 58, y2: 76 },
    eye: { cx: 78, cy: 70, r: 3.5 }
  },
  wing: `M 130 96
         C 150 92, 180 100, 198 114
         C 206 122, 202 134, 192 138
         C 172 142, 144 136, 128 122
         C 120 114, 122 104, 130 96 Z`,
  wingCoverts: [
    `M 138 102 C 158 100, 180 108, 192 120`,
    `M 144 112 C 164 110, 186 120, 196 130`
  ],
  tailFeathers: [
    `M 226 118 C 238 104, 250 96, 258 92 C 254 104, 248 118, 238 130`,
    `M 230 126 C 240 116, 252 108, 260 102 C 256 114, 250 126, 242 136`
  ],
  plumageLeg: {
    fluffNear: `M 134 162 C 124 172, 130 184, 142 192 C 152 192, 162 184, 162 172 C 162 158, 148 154, 134 162 Z`,
    fluffFar: `M 152 160 C 146 170, 150 180, 160 186 C 166 186, 174 180, 174 168 Z`,
    drumstickNear: `M 134 162 C 124 176, 130 190, 142 196 C 150 196, 160 188, 160 174 C 160 160, 146 154, 134 162 Z`,
    drumstickFar: `M 152 160 C 146 172, 150 186, 160 192 C 166 192, 174 184, 174 170 Z`,
    metatarsusNear: `M 142 196 C 138 202, 138 206, 140 210`,
    metatarsusFar: `M 160 192 L 160 210`,
    digitsNear: `M 140 210 L 110 210 M 140 210 L 112 206 M 140 210 L 114 214 M 140 210 L 156 210`,
    digitsFar: `M 160 210 L 132 210 M 160 210 L 134 206 M 160 210 L 136 214 M 160 210 L 174 210`
  },
  breast: `M 70 82 C 50 98, 34 122, 34 146 C 36 170, 54 194, 84 200 C 106 184, 110 158, 108 134 C 102 114, 90 94, 70 82 Z`,
  myopathyStripes: [
    `M 48 132 C 62 142, 82 152, 96 154`,
    `M 44 146 C 58 156, 78 164, 92 168`,
    `M 50 160 C 64 168, 82 174, 98 176`,
    `M 56 172 C 70 178, 86 182, 100 184`
  ],
  skeleton: {
    spine: `M 100 68 C 112 80, 126 94, 146 104 C 168 114, 194 116, 216 118`,
    pelvis: `M 166 112 C 182 114, 198 115, 214 116`,
    coracoid: `M 114 102 L 90 120`,
    keel: `M 80 110 C 64 132, 54 156, 64 180`,
    ribs: [
      `M 128 104 C 122 116, 114 130, 104 140`,
      `M 136 107 C 130 120, 122 134, 112 144`,
      `M 144 110 C 138 124, 130 138, 120 148`
    ],
    femur: `M 164 124 L 144 152`,
    tibia: `M 144 152 C 136 162, 140 176, 142 196`,
    metatarsus: `M 142 196 C 138 202, 138 206, 140 210`,
    digits: `M 140 210 L 110 210 M 140 210 L 112 206 M 140 210 L 114 214 M 140 210 L 156 210`,
    farLeg: {
      femur: `M 174 122 L 158 148`,
      tibia: `M 158 148 L 160 192`,
      metatarsus: `M 160 192 L 160 210`,
      digits: `M 160 210 L 132 210 M 160 210 L 134 206 M 160 210 L 136 214 M 160 210 L 174 210`
    }
  },
  heart: {
    main: `M 114 114 C 124 112, 134 118, 134 128 C 134 142, 122 152, 114 154 C 106 152, 94 142, 96 128 C 96 118, 106 112, 114 114 Z`,
    rv: `M 96 128 C 88 136, 90 146, 106 152 C 100 146, 97 138, 96 128 Z`,
    ascites: `M 104 168 C 120 180, 148 180, 166 170 C 154 186, 120 186, 104 168 Z`,
    lungs: `M 122 92 C 132 88, 146 92, 148 102 C 140 104, 126 102, 122 92 Z`
  },
  centerOfGravity: {
    cx: 98,
    cy: 144,
    plumbLineY: 210,
    stabilityStatus: "collapsed",
    torqueOffsetPx: 46
  },
  pododermatitis: {
    footpad: { cx: 140, cy: 209, r: 4.8 },
    hock: { cx: 142, cy: 194, r: 3.8 }
  },
  groundClearanceMm: 6,
  breastYieldPercent: 24.8
};
