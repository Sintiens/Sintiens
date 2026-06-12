import React from 'react';

export const GlossaryWord: React.FC<{ word: string, children: React.ReactNode }> = ({ word, children }) => {
  return (
    <span className="cursor-help underline decoration-dotted decoration-primary/50 hover:bg-primary/10 transition-colors" title={word}>
      {children}
    </span>
  );
};
