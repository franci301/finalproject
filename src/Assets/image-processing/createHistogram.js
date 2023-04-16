import nearestColor from "nearest-color";
import colourNamesExhaustive from "./colourNamesExhaustive";
import quantizeColor from "./quantizeColor";
import averageBucketColors from "./averageBucketColors";

export default function createColorHistogram(imageData) {
const gridSize = 16;
  const data = imageData.data;
  const histogram = new Map([]);
  const nearest = nearestColor.from(colourNamesExhaustive);
  const bucketColorsMap = new Map();

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const quantizedColor = quantizeColor(r, g, b, gridSize);

    const bucketKey = `${quantizedColor.r},${quantizedColor.g},${quantizedColor.b}`;
    if (bucketColorsMap.has(bucketKey)) {
      bucketColorsMap.get(bucketKey).push({ r, g, b });
    } else {
      bucketColorsMap.set(bucketKey, [{ r, g, b }]);
    }
  }

  for (const [bucketKey, bucketColors] of bucketColorsMap.entries()) {
    const averagedColor = averageBucketColors(bucketColors);
    const nearestColorName = nearest(averagedColor).name;

    if (histogram.has(nearestColorName)) {
      histogram.set(nearestColorName, histogram.get(nearestColorName) + bucketColors.length);
    } else {
      histogram.set(nearestColorName, bucketColors.length);
    }
  }

  const threshold = 1000;
  const keys = histogram.keys();
  for (let color of keys) {
    if (histogram.get(color) < threshold) {
      histogram.delete(color);
    }
  }

  const newKeys = histogram.keys();
  let total = 0;
  for (let color of newKeys) {
    total += histogram.get(color);
  }
  histogram.set('total-size', total);
  return histogram;
}