import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = 'public';

const imagesToOptimize = [
  { input: 'chicken_1978.png', output: 'chicken_1978.webp', quality: 80 },
  { input: 'chicken_1957.png', output: 'chicken_1957.webp', quality: 80 },
  { input: 'chicken_2005.png', output: 'chicken_2005.webp', quality: 80 },
  { input: 'hen_free.png', output: 'hen_free.webp', quality: 80 },
  { input: 'hen_battery.png', output: 'hen_battery.webp', quality: 80 },
];

async function optimizeImages() {
  for (const img of imagesToOptimize) {
    const inputPath = path.join(publicDir, img.input);
    const outputPath = path.join(publicDir, img.output);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  ${img.input} not found, skipping`);
      continue;
    }
    
    const stats = fs.statSync(inputPath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    
    await sharp(inputPath)
      .webp({ quality: img.quality, effort: 6 })
      .toFile(outputPath);
    
    const outStats = fs.statSync(outputPath);
    const outSizeKB = (outStats.size / 1024).toFixed(1);
    const savings = ((1 - outStats.size / stats.size) * 100).toFixed(1);
    
    console.log(`✅ ${img.input} (${sizeKB} KB) → ${img.output} (${outSizeKB} KB) - ${savings}% smaller`);
  }
  
  // Also create AVIF versions for even better compression
  console.log('\n📦 Creating AVIF versions...');
  for (const img of imagesToOptimize) {
    const inputPath = path.join(publicDir, img.input);
    const outputPath = path.join(publicDir, img.output.replace('.webp', '.avif'));
    
    if (!fs.existsSync(inputPath)) continue;
    
    await sharp(inputPath)
      .avif({ quality: 50, effort: 9 })
      .toFile(outputPath);
    
    const outStats = fs.statSync(outputPath);
    const outSizeKB = (outStats.size / 1024).toFixed(1);
    console.log(`✅ ${img.input} → ${path.basename(outputPath)} (${outSizeKB} KB)`);
  }
}

optimizeImages().catch(console.error);