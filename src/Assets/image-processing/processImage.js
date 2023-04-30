import createColorHistogram from "./createHistogram";
/**
 *  Function to create a colour histogram
 *  @param {blob} img - image uploaded by the user
 */
export default function processImage(img) {
  const numBlocks = 3; // 3x3 grid for 9 equal-sized blocks
  const blockWidth = Math.floor(img.width / numBlocks);
  const blockHeight = Math.floor(img.height / numBlocks);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  // Resize the image to the nearest multiple of the number of blocks
  const resizedWidth = blockWidth * numBlocks;
  const resizedHeight = blockHeight * numBlocks;

  canvas.width = resizedWidth;
  canvas.height = resizedHeight;
  ctx.drawImage(img, 0, 0, resizedWidth, resizedHeight);

  const colorHistograms = [];

  for (let row = 0; row < numBlocks; row++) {
    for (let col = 0; col < numBlocks; col++) {
      const x = col * blockWidth;
      const y = row * blockHeight;
      const imageData = ctx.getImageData(x, y, blockWidth, blockHeight);
      const histogram = createColorHistogram(imageData);
      colorHistograms.push(histogram);
    }
  }
  return colorHistograms;
}