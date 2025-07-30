// create-responsive-images.mjs
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  'marble_slider',
  'limestone_slider', 
  'travertine_slider'
];

// Define responsive breakpoints
const sizes = [
  { suffix: '_mobile', width: 400, height: 225, quality: 75 },      // Mobile (16:9 ratio)
  { suffix: '_mobile_2x', width: 800, height: 450, quality: 75 },   // Mobile 2x
  { suffix: '_tablet', width: 650, height: 366, quality: 80 },      // Tablet
  { suffix: '_tablet_2x', width: 1300, height: 731, quality: 80 },  // Tablet 2x
  { suffix: '_desktop', width: 800, height: 450, quality: 85 },     // Desktop
  { suffix: '_desktop_2x', width: 1600, height: 900, quality: 85 }  // Desktop 2x
];

async function createResponsiveImages() {
  const imagesDir = path.join(__dirname, '..', '..', '..', 'public', 'images');
  
  for (const imageName of images) {
    const inputAvif = path.join(imagesDir, `${imageName}.avif`);
    const inputWebp = path.join(imagesDir, `${imageName}.webp`);
    
    // Use AVIF if available, otherwise WebP
    const inputFile = fs.existsSync(inputAvif) ? inputAvif : inputWebp;
    
    if (!fs.existsSync(inputFile)) {
      console.log(`❌ File not found: ${inputFile}`);
      continue;
    }

    console.log(`\n🔄 Processing: ${imageName}`);
    
    for (const size of sizes) {
      // Create AVIF versions
      const avifOutput = path.join(imagesDir, `${imageName}${size.suffix}.avif`);
      await sharp(inputFile)
        .avif({ 
          quality: size.quality,
          effort: 6 
        })
        .resize(size.width, size.height, { 
          fit: 'cover',
          withoutEnlargement: true 
        })
        .toFile(avifOutput);

      // Create WebP versions for fallback
      const webpOutput = path.join(imagesDir, `${imageName}${size.suffix}.webp`);
      await sharp(inputFile)
        .webp({ 
          quality: size.quality,
          effort: 6 
        })
        .resize(size.width, size.height, { 
          fit: 'cover',
          withoutEnlargement: true 
        })
        .toFile(webpOutput);

      const avifStats = fs.statSync(avifOutput);
      const webpStats = fs.statSync(webpOutput);
      
      console.log(`  ✅ ${size.suffix}: AVIF ${Math.round(avifStats.size / 1024)}KB, WebP ${Math.round(webpStats.size / 1024)}KB`);
    }
  }
  
  console.log('\n🎉 All responsive images created!');
}

createResponsiveImages().catch(console.error);