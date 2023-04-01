export default function averageColors(currentColor, newColor, count) {
  const weight1 = count - 1;
  const weight2 = 1;

  const r = (currentColor.r * weight1 + newColor.r * weight2) / count;
  const g = (currentColor.g * weight1 + newColor.g * weight2) / count;
  const b = (currentColor.b * weight1 + newColor.b * weight2) / count;

  return { r, g, b };
}
