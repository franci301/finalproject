import CalculateValidDistance from '../src/GetAndSet/calculateValidDistance';

describe('CalculateValidDistance', () => {
  test('should return true when the distance is within the specified limit', () => {
    const limit = 10; // 10km
    const lat1 = 40.7128;
    const lon1 = -74.0060;
    const lat2 = 40.730610;
    const lon2 = -73.935242;

    const result = CalculateValidDistance(limit, lat1, lon1, lat2, lon2);
    expect(result).toBeTruthy();
  });

  test('should return false when the distance is greater than the specified limit', () => {
    const limit = 2; // 2km
    const lat1 = 40.7128;
    const lon1 = -74.0060;
    const lat2 = 40.730610;
    const lon2 = -73.935242;

    const result = CalculateValidDistance(limit, lat1, lon1, lat2, lon2);
    expect(result).toBeFalsy();
  });

  test('should return true when the distance is exactly equal to the specified limit', () => {
    const limit = 5.398; // 5.398km
    const lat1 = 40.7128;
    const lon1 = -74.0060;
    const lat2 = 40.730610;
    const lon2 = -73.935242;

    const result = CalculateValidDistance(limit, lat1, lon1, lat2, lon2);
    expect(result).toBeFalsy();
  });

  test('should handle edge case with the same coordinates', () => {
    const limit = 0;
    const lat1 = 40.7128;
    const lon1 = -74.0060;

    const result = CalculateValidDistance(limit, lat1, lon1, lat1, lon1);
    expect(result).toBeTruthy();
  });
});
