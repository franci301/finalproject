function rgbToXyz(r, g, b) {
  const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

  r = toLinear(r);
  g = toLinear(g);
  b = toLinear(b);

  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

  return { x, y, z };
}

function xyzToLab(x, y, z) {
  const toLab = (c) => (c > 0.008856 ? Math.pow(c, 1 / 3) : 7.787 * c + 16 / 116);

  x /= 0.95047;
  y /= 1.0;
  z /= 1.08883;

  const fx = toLab(x);
  const fy = toLab(y);
  const fz = toLab(z);

  const L = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);

  return { L, a, b };
}

export default function rgbToLab(r, g, b) {
  const { x, y, z } = rgbToXyz(r, g, b);
  return xyzToLab(x, y, z);
}
