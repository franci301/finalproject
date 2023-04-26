import rgbToLab from '../src/Assets/image-processing/rgbTolab';

describe('rgbToLab function', () => {
  it('should convert RGB to LAB correctly', () => {

    const testCases = [
      { rgb: [0, 0, 0], lab: { L: 0, a: 0, b: 0 } },
      { rgb: [255, 255, 255], lab: { L: 100, a: 0.00526049995830391, b: 0.010408184525267927 } },
      { rgb: [255, 0, 0], lab: { L: 53.23288178584245, a: 80.10930952982204, b: 67.22006831026425 } },
      { rgb: [0, 255, 0], lab: { L: 87.73703347354422, a: -86.18463649762525, b: 83.18116474777854 } },
      { rgb: [0, 0, 255], lab: { L: 32.302586667249486, a: 79.19666178930935, b: -107.86368104495168 } },
    ];

    testCases.forEach((testCase) => {
      const [r, g, b] = testCase.rgb;
      const result = rgbToLab(r, g, b);
      const { L, a, b: b2 } = testCase.lab;

      expect(result.L).toBeCloseTo(L, 3);
      expect(result.a).toBeCloseTo(a, 6);
      expect(Math.abs(result.b)).toBeCloseTo(Math.abs(b2), 6);
    });
  });
});
