// Define a function to quantize a color based on the specified grid size
export default function quantizeColor(r, g, b, gridSize) {
  // Calculate the quantized red component by dividing the original value by the grid size, rounding down,
  // multiplying by the grid size, and adding half the grid size
  const qR = Math.floor(r / gridSize) * gridSize + Math.floor(gridSize / 2);

  // Calculate the quantized green component by dividing the original value by the grid size, rounding down,
  // multiplying by the grid size, and adding half the grid size
  const qG = Math.floor(g / gridSize) * gridSize + Math.floor(gridSize / 2);

  // Calculate the quantized blue component by dividing the original value by the grid size, rounding down,
  // multiplying by the grid size, and adding half the grid size
  const qB = Math.floor(b / gridSize) * gridSize + Math.floor(gridSize / 2);

  // Return the quantized color as an object with r, g, and b properties
  return { r: qR, g: qG, b: qB };
}
