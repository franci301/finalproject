import rgbToLab from "./rgbTolab";

export default function compareRGBArrays(arr1, arr2, similarityThreshold = 2.3, minSimilarBlocks = 4) {
  let similarBlocks = 0;

  for (let i = 0; i < arr1.length; i++) {
    const color1 = rgbToLab(arr1[i].r, arr1[i].g, arr1[i].b);
    const color2 = rgbToLab(arr2[i].r, arr2[i].g, arr2[i].b);

    const distance = Math.sqrt(
      Math.pow(color1.L - color2.L, 2) +
      Math.pow(color1.a - color2.a, 2) +
      Math.pow(color1.b - color2.b, 2)
    );

    if (distance <= similarityThreshold) {
      similarBlocks++;
    }
  }

  return similarBlocks >= minSimilarBlocks;
}
