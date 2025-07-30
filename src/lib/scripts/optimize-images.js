const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  'marble_slider.webp',
  'limestone_slider.webp', 
  'travertine_slide.webp'
];

images.forEach(async (img) => {
  const input = path.join('public/images', img);
  const output = path.join('public/images', `optimized_${img}`);
  
  await sharp(input)
    .webp({ quality: 85, effort: 6 })
    .resize(1600, 900, { fit: 'cover' })
    .toFile(output);
    
  console.log(`Optimized ${img}`);
});