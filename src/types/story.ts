import React from 'react';

export interface BranchNode {
  id: string;
  label: string;
  shortDesc?: string;
  content?: React.ReactNode;
  category?: 'Ejemplos' | 'Relaciones' | 'Contexto' | string;
  children?: BranchNode[];
}

export interface TopicBlockData {
  title: string;
  content: React.ReactNode;
  treeData?: BranchNode[];
}
