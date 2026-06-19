import React from 'react';

export interface BranchNode {
  id: string;
  label: string;
  shortDesc?: string;
  content?: React.ReactNode;
  category?: 'Ejemplos' | 'Relaciones' | 'Contexto' | string;
  children?: BranchNode[];
}

export interface DeepDiveData {
  id: string;
  label: string;
  nodes: BranchNode[];
}

export interface MicroQuizData {
  question: string;
  options: string[];
  revealFact: string;
}

export interface TopicBlockData {
  id: string;
  title: string;
  content: React.ReactNode;
  deepDive?: DeepDiveData;
  keyIdea?: string;
  analogy?: { text: string };
  didYouKnow?: string;
  pullQuote?: string;
  reflectionQuestion?: { question: string; prompt?: string };
  microQuiz?: MicroQuizData;
  readingTimeMin?: number;
}
