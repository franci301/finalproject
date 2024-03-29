
/**
 * Function to normalise the colours inside an image
 * @param {blob} img - image uploaded by the user
 */
export default function processImageNormalise(img){
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

      const rgbArray = [];

      for (let row = 0; row < numBlocks; row++) {
        for (let col = 0; col < numBlocks; col++) {
          const x = col * blockWidth;
          const y = row * blockHeight;
          // fetching the image data for each block
          const data = ctx.getImageData(x, y, blockWidth, blockHeight).data;
          let r = 0,
            g = 0,
            b = 0;

          // sum the rgb values
          for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
          }
          // divide by the number of pixels
          const numPixels = data.length / 4;
          r /= numPixels;
          g /= numPixels;
          b /= numPixels;

          rgbArray.push({
            r: r / 255,
            g: g / 255,
            b: b / 255,
          });
        }
      }
    //   rgb array contains 9 normalised rgb objects each representing an equally sized square of the image
      return rgbArray
}
