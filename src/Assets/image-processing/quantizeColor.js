export default function quantizeColor(r, g, b, gridSize) {
  const qR = Math.floor(r / gridSize) * gridSize + Math.floor(gridSize / 2);
  const qG = Math.floor(g / gridSize) * gridSize + Math.floor(gridSize / 2);
  const qB = Math.floor(b / gridSize) * gridSize + Math.floor(gridSize / 2);
  return { r: qR, g: qG, b: qB };
}