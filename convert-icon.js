const sharp = require('sharp');
const path = require('path');

async function convertIcon() {
  const inputPath = path.join(__dirname, 'assets', 'concorddexmobilelogo.png');
  const outputPath = path.join(__dirname, 'assets', 'concorddexmobilelogo_black.png');

  // Read the image, flatten with black background (replaces transparency/white)
  await sharp(inputPath)
    .flatten({ background: { r: 0, g: 0, b: 0 } })
    .toFile(outputPath);

  console.log('Created black background icon at:', outputPath);
}

convertIcon().catch(console.error);
