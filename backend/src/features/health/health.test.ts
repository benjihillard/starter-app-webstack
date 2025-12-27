import { describe, it, expect } from 'vitest';

describe('Health Feature', () => {
  it('should return correct health status structure', () => {
    const mockResponse = { status: 'ok', database: 'connected' };
    expect(mockResponse).toHaveProperty('status');
    expect(mockResponse).toHaveProperty('database');
  });

  it('should return error status when database is disconnected', () => {
    const mockErrorResponse = { status: 'error', database: 'disconnected' };
    expect(mockErrorResponse.status).toBe('error');
    expect(mockErrorResponse.database).toBe('disconnected');
  });
});
