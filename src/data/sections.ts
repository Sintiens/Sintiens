import type { TabType } from "../types";

export type CategoryId = "argumento" | "glosario" | "laboratorio" | "noticias";

export interface SubSection {
  tabId: TabType;
  label: string;
  path: string;
}

export interface Category {
  id: CategoryId;
  label: string;
  defaultTabId: TabType;
  subSections: SubSection[];
}

export const CATEGORIES: Category[] = [
  {
    id: "argumento",
    label: "Argumento",
    defaultTabId: "historia_narrativa",
    subSections: [
      { tabId: "historia_narrativa", label: "Relato", path: "/" },
      { tabId: "datos", label: "Cifras", path: "/argumento/cifras" },
      { tabId: "cronologia", label: "Cronología", path: "/argumento/cronologia" },
      { tabId: "dialectica", label: "Crítica", path: "/argumento/critica" },
    ],
  },
  {
    id: "glosario",
    label: "Glosario",
    defaultTabId: "grafo",
    subSections: [
      { tabId: "grafo", label: "Glosario", path: "/glosario" },
    ],
  },
  {
    id: "laboratorio",
    label: "Laboratorio",
    defaultTabId: "laboratorio_hub",
    subSections: [
      { tabId: "laboratorio_hub", label: "Inicio", path: "/laboratorio" },
      { tabId: "calculadora", label: "Impacto", path: "/laboratorio/impacto" },
      { tabId: "validador", label: "Descomponer", path: "/laboratorio/descomponer" },
    ],
  },
  {
    id: "noticias",
    label: "Noticias",
    defaultTabId: "noticias",
    subSections: [
      { tabId: "noticias", label: "Noticias", path: "/noticias" },
    ],
  },
];

export function getCategoryForTab(tab: TabType): CategoryId {
  for (const cat of CATEGORIES) {
    if (cat.subSections.some((s) => s.tabId === tab)) return cat.id;
  }
  return "argumento";
}

export function getCategoryForPath(pathname: string): Category | undefined {
  for (const cat of CATEGORIES) {
    if (cat.subSections.some((s) => s.path === pathname)) return cat;
  }
  return undefined;
}

export function getSubSectionsForTab(tab: TabType): SubSection[] {
  const catId = getCategoryForTab(tab);
  return CATEGORIES.find((c) => c.id === catId)?.subSections ?? [];
}

export function hasSubNav(tab: TabType): boolean {
  return getSubSectionsForTab(tab).length > 1;
}

export function isSameCategory(tabA: TabType, tabB: TabType): boolean {
  return getCategoryForTab(tabA) === getCategoryForTab(tabB);
}