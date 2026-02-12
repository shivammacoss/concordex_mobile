const sharp = require('sharp');
const path = require('path');

async function convertIcon() {
  const inputPath = path.join(__dirname, 'assets', 'concorddexmobilelogo.png');
  const foregroundPath = path.join(__dirname, 'assets', 'concorddexmobilelogo_foreground.png');
  const iconPath = path.join(__dirname, 'assets', 'concorddexmobilelogo_black.png');

  // Get image metadata
  const metadata = await sharp(inputPath).metadata();
  const { width, height } = metadata;

  // Read raw pixel data
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Replace white/near-white/light pixels with transparent
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // If pixel is white or near-white (all channels > 220)
    if (r > 220 && g > 220 && b > 220) {
      data[i + 3] = 0; // Make transparent
    }
  }

  // Save foreground with transparent background (for adaptive icon)
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(foregroundPath);

  console.log('Created transparent foreground at:', foregroundPath);

  // Also create the main icon with black background
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .flatten({ background: { r: 0, g: 0, b: 0 } })
    .png()
    .toFile(iconPath);

  console.log('Created black background icon at:', iconPath);
}

convertIcon().catch(console.error);
