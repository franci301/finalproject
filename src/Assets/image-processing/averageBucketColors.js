export default function averageBucketColors(bucketColors) {
  let totalR = 0;
  let totalG = 0;
  let totalB = 0;
  let count = bucketColors.length;

  for (const color of bucketColors) {
    totalR += color.r;
    totalG += color.g;
    totalB += color.b;
  }

  return { r: totalR / count, g: totalG / count, b: totalB / count };
}