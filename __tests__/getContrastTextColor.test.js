import getContrastTextColor from '../src/Assets/image-processing/getContrastTextColor';

describe('getContrastTextColor function', () => {
  it('should return "black" for light colors', () => {
    const testCases = [
      { hexColor: '#FFFFFF' },
      { hexColor: '#FAFAFA' },
      { hexColor: '#F5F5F5' },
      { hexColor: '#E0E0E0' },
      { hexColor: '#D3D3D3' },
    ];

    testCases.forEach((testCase) => {
      const { hexColor } = testCase;
      expect(getContrastTextColor(hexColor)).toEqual('black');
    });
  });

  it('should return "white" for dark colors', () => {
    const testCases = [
      { hexColor: '#000000' },
      { hexColor: '#333333' },
      { hexColor: '#666666' },
      { hexColor: '#808080' },
    ];

    testCases.forEach((testCase) => {
      const { hexColor } = testCase;
      expect(getContrastTextColor(hexColor)).toEqual('white');
    });
  });
});
