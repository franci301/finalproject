import nearestColor from "nearest-color";
import colourNamesExhaustive from "./colourNamesExhaustive";
import quantizeColor from "./quantizeColor";
import averageBucketColors from "./averageBucketColors";

// Define a function to create a color histogram from image data
export default function createColorHistogram(imageData) {
  // Set the grid size for quantization
  const gridSize = 16;
  // Get the pixel data from the image
  const data = imageData.data;
  // Initialize the color histogram as an empty Map
  const histogram = new Map([]);
  // Initialize nearest color finder with the exhaustive list of color names
  const nearest = nearestColor.from(colourNamesExhaustive);
  // Initialize a Map to store color buckets
  const bucketColorsMap = new Map();

  // Iterate over each pixel in the image data
  for (let i = 0; i < data.length; i += 4) {
    // Get the RGB values of the current pixel
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Quantize the current pixel color
    const quantizedColor = quantizeColor(r, g, b, gridSize);

    // Create a key for the color bucket and update the bucket colors map
    const bucketKey = `${quantizedColor.r},${quantizedColor.g},${quantizedColor.b}`;
    if (bucketColorsMap.has(bucketKey)) {
      bucketColorsMap.get(bucketKey).push({ r, g, b });
    } else {
      bucketColorsMap.set(bucketKey, [{ r, g, b }]);
    }
  }

  // Iterate over each color bucket
  for (const [bucketKey, bucketColors] of bucketColorsMap.entries()) {
    // Calculate the average color of the current bucket
    const averagedColor = averageBucketColors(bucketColors);
    // Find the nearest color name to the averaged color
    const nearestColorName = nearest(averagedColor).name;

    // Update the histogram with the nearest color name and its count
    if (histogram.has(nearestColorName)) {
      histogram.set(nearestColorName, histogram.get(nearestColorName) + bucketColors.length);
    } else {
      histogram.set(nearestColorName, bucketColors.length);
    }
  }

  // Set a threshold for removing low-count colors from the histogram
  const threshold = 1000;
  // Get the color names in the histogram
  const keys = histogram.keys();
  // Remove colors with count below the threshold
  for (let color of keys) {
    if (histogram.get(color) < threshold) {
      histogram.delete(color);
    }
  }

  // Calculate the total count of remaining colors in the histogram
  const newKeys = histogram.keys();
  let total = 0;
  for (let color of newKeys) {
    total += histogram.get(color);
  }
  // Add the total count to the histogram
  histogram.set('total-size', total);
  // Return the final histogram
  return histogram;
}
