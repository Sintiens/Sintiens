import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  [/bg-zinc-50(\/\d+)?/g, 'bg-surface'],
  [/dark:bg-zinc-950(\/\d+)?/g, ''],
  [/bg-zinc-100(\/\d+)?/g, 'bg-surface-container'],
  [/dark:bg-zinc-900(\/\d+)?/g, ''],
  [/bg-white(\/\d+)?/g, 'bg-surface-container'],
  [/text-zinc-900/g, 'text-on-surface'],
  [/dark:text-white/g, ''],
  [/text-zinc-800/g, 'text-on-surface'],
  [/dark:text-zinc-200/g, ''],
  [/text-zinc-700/g, 'text-on-surface-variant'],
  [/dark:text-zinc-300/g, ''],
  [/text-zinc-600/g, 'text-on-surface-variant'],
  [/dark:text-zinc-400/g, ''],
  [/text-zinc-500/g, 'text-on-surface-variant'],
  [/dark:text-zinc-500/g, ''],
  [/text-zinc-400/g, 'text-on-surface-variant'],
  [/border-zinc-200(\/\d+)?/g, 'border-surface-variant'],
  [/dark:border-zinc-800(\/\d+)?/g, ''],
  [/dark:border-zinc-900(\/\d+)?/g, ''],
  [/border-zinc-300(\/\d+)?/g, 'border-outline-variant']
];

for (const file of files) {
  if (file === 'ImpactCalculator.tsx') continue;
  
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf-8');
  
  for (const [regex, replacement] of replacements) {
    content = content.replace(regex, replacement);
  }

  if (file === 'NetworkGraph.tsx') {
    content = content.replace(/const getCatColor = [\s\S]*?;\n/m, `const getCatColor = (cat: string, opacity: number) => {\n          const isDark = document.documentElement.classList.contains("dark");\n          return \`rgba(\${isDark ? '179, 204, 190' : '5, 27, 18'}, \${opacity})\`;\n        };\n`);
  }

  // Cleanup double spaces created by empty replacements in class attributes
  content = content.replace(/className="([^"]+)"/g, (match, classes) => {
    return `className="${classes.replace(/\s+/g, ' ').trim()}"`;
  });

  fs.writeFileSync(p, content);
}
console.log("Refactored UI classes");
