import quantizeColor from '../src/Assets/image-processing/quantizeColor';

describe('quantizeColor function', () => {
  it('should quantize color correctly', () => {
    const testCases = [      { color: [100, 150, 250], gridSize: 25, quantizedColor: { r: 100, g: 150, b: 250 } },
      { color: [200, 100, 50], gridSize: 50, quantizedColor: { r: 200, g: 100, b: 50 } },
      { color: [125, 175, 225], gridSize: 25, quantizedColor: { r: 125, g: 175, b: 225 } },
    ];

    testCases.forEach((testCase) => {
      const [r, g, b] = testCase.color;
      const { r: qr, g: qg, b: qb } = testCase.quantizedColor;

      expect(quantizeColor(r, g, b, testCase.gridSize)).toEqual({ r: qr, g: qg, b: qb });
    });
  });
});

