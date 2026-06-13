const fs = require('fs');
const path = 'C:/Users/ger4s/Documents/02 Proyectos/Sintiens/recovered_files';

fs.readdirSync(path).forEach(f => {
    let content = fs.readFileSync(`${path}/${f}`, 'utf8');
    let trimmed = content.trim();
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
        try {
            content = JSON.parse(trimmed);
            if (f === 'storyData.tsx') {
                fs.writeFileSync(`C:/Users/ger4s/Documents/02 Proyectos/Sintiens/src/data/${f}`, content, 'utf8');
            } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
                fs.writeFileSync(`C:/Users/ger4s/Documents/02 Proyectos/Sintiens/src/components/${f}`, content, 'utf8');
            } else if (f.endsWith('.md')) {
                // Ignore md files
            }
            console.log(`Unescaped and saved ${f}`);
        } catch (e) {
            console.error(`Failed to unescape ${f}:`, e);
        }
    }
});
