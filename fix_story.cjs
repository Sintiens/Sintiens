const fs = require('fs');
const path = 'C:/Users/ger4s/antigravity/Sintiens/src/data/storyData.tsx';
let c = fs.readFileSync(path, 'utf8').trim();
try {
  if (c.startsWith('"')) {
    // try to unescape it, it might be truncated though
    if (!c.endsWith('"')) c += '"';
    c = JSON.parse(c);
    fs.writeFileSync(path, c, 'utf8');
    console.log('Fixed storyData.tsx');
  } else {
    console.log('Already unescaped');
  }
} catch(e) {
  console.error('Error parsing JSON:', e.message);
  // manual unescape if JSON.parse fails due to truncation
  let unescaped = c.replace(/^"/, '').replace(/"$/, '').replace(/\\n/g, '\n').replace(/\\"/g, '"');
  fs.writeFileSync(path, unescaped, 'utf8');
  console.log('Manually unescaped storyData.tsx');
}
