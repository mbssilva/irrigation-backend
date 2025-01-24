export function moistureLevelRegression(moistureLevel: number) {
  return 1.0966 * Math.exp((-10.02 * moistureLevel) / 4095);
}
