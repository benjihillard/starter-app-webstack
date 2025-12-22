import { describe, it, expect } from 'vitest';
import { parseNumber, tryParseNumber } from './parseNumber';

describe('parseNumber', () => {
  it('parses valid integer strings', () => {
    expect(parseNumber('42')).toBe(42);
    expect(parseNumber('0')).toBe(0);
    expect(parseNumber('-10')).toBe(-10);
  });

  it('parses valid decimal strings', () => {
    expect(parseNumber('3.14')).toBe(3.14);
    expect(parseNumber('-0.5')).toBe(-0.5);
  });

  it('returns fallback for invalid strings', () => {
    expect(parseNumber('abc')).toBe(0);
    expect(parseNumber('abc', 99)).toBe(99);
  });

  it('handles empty string', () => {
    expect(parseNumber('')).toBe(0);
  });

  it('handles whitespace strings', () => {
    expect(parseNumber('   ')).toBe(0);
    expect(parseNumber('  42  ')).toBe(42);
  });

  it('handles edge cases', () => {
    expect(parseNumber('Infinity')).toBe(Infinity);
    expect(parseNumber('-Infinity')).toBe(-Infinity);
  });
});

describe('tryParseNumber', () => {
  it('returns number for valid strings', () => {
    expect(tryParseNumber('42')).toBe(42);
    expect(tryParseNumber('3.14')).toBe(3.14);
    expect(tryParseNumber('-10')).toBe(-10);
  });

  it('returns null for invalid strings', () => {
    expect(tryParseNumber('abc')).toBeNull();
    expect(tryParseNumber('12abc')).toBeNull();
  });

  it('handles empty string', () => {
    expect(tryParseNumber('')).toBe(0); // Empty string converts to 0 in JS
  });

  it('handles whitespace-only strings', () => {
    expect(tryParseNumber('   ')).toBe(0); // Whitespace converts to 0
  });
});
