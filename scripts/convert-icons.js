// This script converts SVG icons to PNG for better compatibility with Android
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const rootDir = process.cwd();
const publicIconsDir = path.join(rootDir, 'public', 'icons');

async function createDirIfNotExists(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function convertSvgToPng() {
  try {
    console.log('Converting SVG icons to PNG...');
    
    // Ensure directory exists
    await createDirIfNotExists(publicIconsDir);
    
    // Convert the 192x192 icon
    const svg192Path = path.join(publicIconsDir, 'pwa-192x192.svg');
    const png192Path = path.join(publicIconsDir, 'pwa-192x192.png');
    const svg192Buffer = await fs.readFile(svg192Path);
    await sharp(svg192Buffer)
      .png()
      .toFile(png192Path);
    console.log(`Created ${png192Path}`);
    
    // Convert the 512x512 icon
    const svg512Path = path.join(publicIconsDir, 'pwa-512x512.svg');
    const png512Path = path.join(publicIconsDir, 'pwa-512x512.png');
    const svg512Buffer = await fs.readFile(svg512Path);
    await sharp(svg512Buffer)
      .png()
      .toFile(png512Path);
    console.log(`Created ${png512Path}`);
    
    // Also create a maskable icon version (with extra padding for safe zone)
    const maskable512Path = path.join(publicIconsDir, 'pwa-maskable-512x512.png');
    await sharp(svg512Buffer)
      .resize({
        width: 470, // Slightly smaller to ensure safe zone
        height: 470,
        fit: 'contain',
        background: { r: 109, g: 40, b: 217, alpha: 1 } // #6D28D9
      })
      .extend({
        top: 21,
        bottom: 21,
        left: 21,
        right: 21,
        background: { r: 109, g: 40, b: 217, alpha: 1 } // #6D28D9
      })
      .png()
      .toFile(maskable512Path);
    console.log(`Created ${maskable512Path} (maskable)`);
    
    console.log('Icon conversion completed successfully!');
    
  } catch (error) {
    console.error('Error converting SVG to PNG:', error);
    process.exit(1);
  }
}

// Run the conversion
convertSvgToPng();
