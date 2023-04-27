import euclideanDistance from '../src/Assets/image-processing/euclideanDistance';

describe('euclideanDistance', () => {
  test('should return 0 when the input colors are the same', () => {
    const color1 = { L: 50, a: 60, b: 70 };
    const color2 = { L: 50, a: 60, b: 70 };

    const result = euclideanDistance(color1, color2);
    expect(result).toBe(0);
  });

  test('should return the correct euclidean distance for different colors', () => {
    const color1 = { L: 50, a: 60, b: 70 };
    const color2 = { L: 80, a: 40, b: 30 };

    const result = euclideanDistance(color1, color2);
    expect(result).toBeCloseTo(53.8516, 4);
  });

  test('should return the correct euclidean distance for colors with negative values', () => {
    const color1 = { L: 50, a: -60, b: 70 };
    const color2 = { L: 80, a: 40, b: -30 };

    const result = euclideanDistance(color1, color2);
    expect(result).toBeCloseTo(144.5683, 4);
  });

  test('should return a non-negative value for any pair of colors', () => {
    const color1 = { L: 50, a: 60, b: 70 };
    const color2 = { L: 80, a: 40, b: 30 };

    const result = euclideanDistance(color1, color2);
    expect(result).toBeGreaterThanOrEqual(0);
  });
});
