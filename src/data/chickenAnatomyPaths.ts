export interface AnatomicalPaths {
  body: string;
  head: {
    comb: string;
    wattle: string;
    beak: string;
    eye: { cx: number; cy: number; r: number };
  };
  wing: string;
  breast: string;
  skeleton: {
    spine: string;
    femur: string;
    tibia: string;
    metatarsus: string;
    digits: string;
  };
  heart: {
    main: string;
    rv?: string; // Right ventricle hypertrophy
    ascites?: string; // Fluid accumulation in abdomen
  };
}

export const chickenPaths1957: AnatomicalPaths = {
  // Balanced, natural stance. Elevated center of gravity.
  body: "M 48 30 C 58 28, 64 34, 66 45 C 72 48, 88 50, 94 56 C 98 62, 98 68, 92 78 C 88 84, 72 90, 56 86 C 42 82, 30 68, 30 52 C 30 42, 40 32, 48 30 Z",
  head: {
    comb: "M 46 28 C 48 20, 54 20, 56 26 C 58 20, 62 20, 64 32",
    wattle: "M 40 40 C 38 48, 44 50, 46 44 Z",
    beak: "M 44 32 L 32 36 L 42 40 Z",
    eye: { cx: 48, cy: 34, r: 1.5 }
  },
  wing: "M 60 55 C 74 58, 86 64, 84 76 C 82 84, 68 80, 60 64 Z",
  // 11% body weight, functional lean muscle
  breast: "M 32 52 C 34 62, 44 68, 52 66 C 54 58, 46 48, 38 48 C 34 48, 32 50, 32 52 Z",
  skeleton: {
    spine: "M 52 38 C 50 48, 60 56, 76 72",
    femur: "M 64 74 L 60 84",
    tibia: "M 60 84 L 62 108",
    metatarsus: "M 62 108 L 62 128",
    digits: "M 62 128 L 54 132 M 62 128 L 66 134"
  },
  heart: {
    main: "M 48 50 C 46 46, 42 46, 42 50 C 42 54, 48 60, 48 60 C 48 60, 54 54, 54 50 C 54 46, 50 46, 48 50 Z"
  }
};

export const chickenPaths1978: AnatomicalPaths = {
  // Heavier, larger breast, slightly lower center of gravity.
  body: "M 48 24 C 62 22, 70 30, 72 44 C 80 48, 98 52, 104 60 C 110 68, 108 78, 100 88 C 94 96, 74 104, 54 98 C 36 92, 22 74, 24 54 C 26 40, 38 28, 48 24 Z",
  head: {
    comb: "M 46 22 C 48 12, 56 12, 58 20 C 62 12, 66 12, 68 26",
    wattle: "M 38 36 C 36 46, 44 48, 46 40 Z",
    beak: "M 42 26 L 28 32 L 40 36 Z",
    eye: { cx: 48, cy: 28, r: 1.8 }
  },
  wing: "M 64 54 C 82 58, 96 66, 94 82 C 92 92, 74 86, 64 66 Z",
  // Doubled breast mass
  breast: "M 26 54 C 28 68, 44 78, 56 74 C 60 62, 48 48, 36 48 C 30 48, 26 50, 26 54 Z",
  skeleton: {
    spine: "M 54 32 C 50 46, 64 58, 84 76",
    femur: "M 68 80 L 62 92",
    tibia: "M 62 92 C 60 106, 62 114, 66 122", // Slight bending starts
    metatarsus: "M 66 122 L 64 146",
    digits: "M 64 146 L 54 152 M 64 146 L 70 154"
  },
  heart: {
    main: "M 48 48 C 44 42, 38 42, 38 48 C 38 56, 48 64, 48 64 C 48 64, 58 56, 58 48 C 58 42, 52 42, 48 48 Z"
  }
};

export const chickenPaths2005: AnatomicalPaths = {
  // Massive, highly disproportionate, center of gravity pulled very far forward.
  body: "M 52 14 C 70 12, 80 24, 82 40 C 94 44, 118 50, 126 62 C 134 74, 130 90, 120 104 C 110 118, 84 128, 56 120 C 30 112, 12 86, 16 60 C 20 40, 36 22, 52 14 Z",
  head: {
    comb: "M 50 12 C 52 0, 62 0, 64 10 C 68 0, 74 0, 76 18",
    wattle: "M 38 28 C 34 42, 46 44, 48 34 Z",
    beak: "M 42 18 L 24 24 L 40 30 Z",
    eye: { cx: 50, cy: 20, r: 2.2 }
  },
  wing: "M 68 50 C 92 56, 110 68, 108 90 C 104 106, 80 98, 68 70 Z",
  // Extreme hypertrophy (+400%), blocks normal stance
  breast: "M 18 60 C 20 84, 46 104, 66 98 C 76 80, 56 50, 36 46 C 26 44, 18 48, 18 60 Z",
  skeleton: {
    spine: "M 58 24 C 52 44, 72 60, 98 84",
    femur: "M 76 86 L 66 102",
    // Pronounced varus/valgus deformity, bent tibia
    tibia: "M 66 102 C 54 120, 60 136, 76 148", 
    metatarsus: "M 76 148 L 68 176",
    digits: "M 68 176 L 54 184 M 68 176 L 78 186"
  },
  heart: {
    // Hypertrophied right ventricle
    main: "M 48 42 C 42 34, 32 34, 32 42 C 32 54, 48 66, 48 66 C 48 66, 64 54, 64 42 C 64 34, 54 34, 48 42 Z",
    rv: "M 48 66 C 36 56, 28 46, 32 40 C 38 48, 44 58, 48 66 Z", // Bulging right side (anatomical right)
    ascites: "M 56 102 C 72 108, 92 102, 102 92 C 92 116, 72 122, 56 112 Z" // Fluid sac in abdomen
  }
};
