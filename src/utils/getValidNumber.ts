export function getValidNumber(input: number, min: number, max: number): number {
  if (Number.isNaN(input)) {
    return input;
  }
  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }

  if (input >= min && input <= max) {
    return input;
  } else {
    return Math.abs(input - min) < Math.abs(input - max) ? min : max;
  }
}
