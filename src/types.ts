export type ConsensusType = "CONSENSO" | "ESCENARIO_GRIS" | "DILEMA" | "FALACIA";

export type TabType = "historia_narrativa" | "grafo" | "cronologia" | "dialectica" | "calculadora" | "validador" | "datos" | "noticias" | "laboratorio_hub";

export interface ReferenceDetail {
  id: string; // e.g. "1", "2"
  citation: string; // Full APA citation
  url?: string; // Optional official link/DOI
}

export interface NodeDetail {
  id: string;
  category: "sintiencia" | "etica" | "psicologia" | "sistemas_uso" | "ecologia" | "legal";
  title: string;
  shortDesc: string;
  longDesc: string;
  scientificFacts: string[];
  connections: string[]; // connects to other node IDs
  citation?: string; // Legacy field for backwards compatibility
  references?: ReferenceDetail[];
  openQuestion?: string;
}

export interface DilemmaDetail {
  id: string;
  category: "sintiencia" | "etica" | "psicologia" | "sistemas_uso" | "ecologia" | "legal";
  title: string;
  popularStatement: string;
  consensus: ConsensusType;
  scientificDeconstruction: string;
  philosophicalDeconstruction: string;
  coexistenceImpact: string;
  citation?: string; // Legacy field for backwards compatibility
  references?: ReferenceDetail[];
  openQuestion?: string;
}

export interface TimelineMilestone {
  id: string;
  year: number;
  yearLabel: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  scientificFacts: string[];
  references?: ReferenceDetail[];
  openQuestion?: string;
  relatedNodeId?: string;
}

export interface TimelineGroup {
  id: string;
  title: string;
  description: string;
  color: string;
  milestones: TimelineMilestone[];
}

export interface StoryBlock {
  id: string;
  title: string;
  content: React.ReactNode;
  keyIdea?: string;
  analogy?: { text: string };
  pullQuote?: string;
  reflectionQuestion?: { question: string; prompt: string };
  microQuiz?: { question: string; options: string[]; correctIndex: number; explanation: string };
  deepDive?: { label: string; content: React.ReactNode };
}

export interface ActData {
  id: string;
  num: string;
  title: string;
  textColor: string;
  colorName: string;
  hoverColor: string;
  blocks: StoryBlock[];
  desc?: string;
  label?: string;
}

export interface DeepDiveData {
  title: string;
  label: string;
  sections: {
    heading: string;
    content: React.ReactNode;
  }[];
  references?: ReferenceDetail[];
}