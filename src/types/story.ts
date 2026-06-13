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

export interface TopicBlockData {
  id: string;
  title: string;
  content: React.ReactNode;
  deepDive?: DeepDiveData;
}
