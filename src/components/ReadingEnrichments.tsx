import { useMemo } from "react";
import type { TopicBlockData } from "../types/story";
import { BlockEnrichments } from "./InlineEnrichments";
import { getActReadingStats } from "../utils/readingTime";

interface ReadingEnrichmentsProps {
  actColor: string;
  blocks: TopicBlockData[];
}

export default function ReadingEnrichments({ actColor, blocks }: ReadingEnrichmentsProps) {
  const accent = actColor ? actColor.replace("text-", "") : "primary";
  const stats = useMemo(() => getActReadingStats(blocks), [blocks]);

  return (
    <div className="relative w-full">
      {blocks.map((block, index) => {
        const min = stats.perBlock[block.id] || 1;
        const hasEnrichments = !!(
          block.keyIdea ||
          block.pullQuote ||
          block.analogy ||
          block.didYouKnow ||
          block.reflectionQuestion
        );

        if (!hasEnrichments) {
          return <div key={block.id} style={{ minHeight: min * 480 }} />;
        }

        return (
          <div
            key={block.id}
            style={{ minHeight: min * 480 }}
            className={index === 0 ? "pt-2" : "pt-8"}
          >
            <BlockEnrichments block={block} accent={accent} />
          </div>
        );
      })}
    </div>
  );
}
