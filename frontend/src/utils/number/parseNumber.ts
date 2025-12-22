/**
 * Safely parses a string to a number.
 * Returns the parsed number if valid, otherwise returns the fallback value.
 *
 * @param value - The string value to parse
 * @param fallback - Value to return if parsing fails (defaults to 0)
 * @returns The parsed number or the fallback value
 */
export function parseNumber(value: string, fallback: number = 0): number {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}

/**
 * Attempts to parse a string to a number.
 * Returns the parsed number if valid, otherwise returns null.
 *
 * @param value - The string value to parse
 * @returns The parsed number or null if invalid
 */
export function tryParseNumber(value: string): number | null {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}
