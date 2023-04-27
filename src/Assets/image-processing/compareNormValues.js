import rgbToLab from "./rgbTolab";
import euclideanDistance from "./euclideanDistance";

/**
 * @param {number} arr1 - list of normalized colour values
 * @param {number} arr2 - list of normalized colour values
 * @param similarityThreshold
 * @param minSimilarBlocks
 */
export default function compareRGBArrays(arr1, arr2, similarityThreshold = 0.7, minSimilarBlocks = 4) {
  let similarBlocks = 0;
  let similarityScoreSum = 0;
  const n = 9; // there will always be 9 blocks

  for (let i = 0; i < n; i++) {
    // convert RGB values to LAB
    const color1 = rgbToLab(arr1[i].r, arr1[i].g, arr1[i].b);
    const color2 = rgbToLab(arr2[i].r, arr2[i].g, arr2[i].b);
    // calculate the Euclidean distance for two colours
    const distance = euclideanDistance(color1,color2);
    const normalizedDistance = Math.min(distance / 100, 1);
    similarityScoreSum += 1 - normalizedDistance;
  }

  const avgSimilarityScore = similarityScoreSum / n;

  if (avgSimilarityScore >= similarityThreshold) {
    similarBlocks = Math.round(avgSimilarityScore * n);
  }

  return similarBlocks >= minSimilarBlocks;
}
