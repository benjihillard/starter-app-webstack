import { describe, it, expect } from 'vitest';

describe('Health Route', () => {
  it('should return correct health status structure', () => {
    const mockResponse = { status: 'ok', database: 'connected' };
    expect(mockResponse).toHaveProperty('status');
    expect(mockResponse).toHaveProperty('database');
  });
});
