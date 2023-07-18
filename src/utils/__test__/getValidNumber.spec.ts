import { getValidNumber } from '../getValidNumber';

describe('getValidNumber', () => {
  it('should return the input if it is within the range', () => {
    expect(getValidNumber(5, 1, 10)).toBe(5);
  });

  it('should return the min if the input is less than the range and closer to min', () => {
    expect(getValidNumber(0, 1, 10)).toBe(1);
  });

  it('should return the max if the input is more than the range and closer to max', () => {
    expect(getValidNumber(15, 1, 10)).toBe(10);
  });

  it('should swap min and max if min is greater than max', () => {
    expect(getValidNumber(5, 10, 1)).toBe(5);
  });

  it('should return the min if the input is less than the range and min is greater than max', () => {
    expect(getValidNumber(0, 10, 1)).toBe(1);
  });

  it('should return the max if the input is more than the range and min is greater than max', () => {
    expect(getValidNumber(15, 10, 1)).toBe(10);
  });

  it('should return NaN when the input is Nan', () => {
    expect(getValidNumber(Number.NaN, 10, 1)).toBeNaN();
  });
});
