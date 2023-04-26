import removeTotalSize from '../src/Assets/image-processing/removeTotalSize';

describe('removeTotalSize function', () => {
  it('should remove "total-size" keys from the maps in the input array', () => {
    // Create sample input data
    const input = [
      new Map([
        ['key1', 10],
        ['total-size', 30],
        ['key2', 20],
      ]),
      new Map([
        ['keyA', 40],
        ['keyB', 50],
        ['total-size', 90],
      ]),
    ];

    // Expected output
    const expectedOutput = [
      new Map([
        ['key1', 10],
        ['key2', 20],
      ]),
      new Map([
        ['keyA', 40],
        ['keyB', 50],
      ]),
    ];

    // Call the function with the input data
    const result = removeTotalSize(input);

    // Check if the output matches the expected output
    expect(result).toEqual(expectedOutput);
  });
});
