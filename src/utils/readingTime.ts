import React from "react";
import type { TopicBlockData } from "../types/story";

const WORDS_PER_MINUTE = 200;

export function extractPlainText(node: React.ReactNode): string {
  if (node === null || node === undefined || node === false || node === true) {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((child) => extractPlainText(child)).join(" ");
  }

  if (React.isValidElement(node)) {
    const children = (node.props as any).children;
    return extractPlainText(children);
  }

  return "";
}

export function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return 1;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export interface ActReadingStats {
  totalMin: number;
  perBlock: Record<string, number>;
}

export function getActReadingStats(blocks: TopicBlockData[]): ActReadingStats {
  const perBlock: Record<string, number> = {};
  let totalMin = 0;
  for (const block of blocks) {
    const min = block.readingTimeMin ?? estimateReadingMinutes(extractPlainText(block.content));
    perBlock[block.id] = min;
    totalMin += min;
  }
  return { totalMin, perBlock };
}
