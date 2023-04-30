// Converts an RGB color to an XYZ color space
function rgbToXyz(r, g, b) {
  // Helper function to convert an RGB component to its linear counterpart
  const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

  // Convert RGB components to linear values
  r = toLinear(r);
  g = toLinear(g);
  b = toLinear(b);

  // Calculate XYZ components using the linear RGB values
  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

  // Return the calculated XYZ components
  return { x, y, z };
}

// Converts an XYZ color to the CIELAB color space
function xyzToLab(x, y, z) {
  // Helper function to convert an XYZ component to its corresponding LAB component
  const toLab = (c) => (c > 0.008856 ? Math.pow(c, 1 / 3) : 7.787 * c + 16 / 116);

  // Normalize XYZ components with respect to the reference white point
  x /= 0.95047;
  y /= 1.0;
  z /= 1.08883;

  // Calculate LAB components using the normalized XYZ values
  const fx = toLab(x);
  const fy = toLab(y);
  const fz = toLab(z);

  const L = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);

  // Return the calculated LAB components
  return { L, a, b };
}

// The main function to convert an RGB color to the CIELAB color space
export default function rgbToLab(r, g, b) {
  // Normalize RGB components (0-1 range)
  r /= 255;
  g /= 255;
  b /= 255;

  // Convert the normalized RGB components to XYZ color space
  const { x, y, z } = rgbToXyz(r, g, b);
  // Convert the XYZ components to the CIELAB color space and return the result
  return xyzToLab(x, y, z);
}
