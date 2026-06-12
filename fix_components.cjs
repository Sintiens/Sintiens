const fs = require('fs');
['DeepDiveView.tsx', 'GraphWidget.tsx', 'VisualGraphView.tsx'].forEach(f => {
  let p = 'C:/Users/ger4s/antigravity/Sintiens/src/components/' + f;
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8').trim();
  if (c.startsWith('"')) {
    try {
      if (!c.endsWith('"')) c += '"';
      let u = JSON.parse(c);
      fs.writeFileSync(p, u, 'utf8');
      console.log('Parsed', f);
    } catch(e) {
      let u = c.replace(/^"/, '').replace(/"$/, '').replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'");
      fs.writeFileSync(p, u, 'utf8');
      console.log('Manually fixed', f);
    }
  }
});
