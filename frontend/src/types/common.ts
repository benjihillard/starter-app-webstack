/**
 * Common types used across the application.
 *
 * Examples of what might go here:
 * - API response shapes
 * - Shared entity types (User, Product, etc.)
 * - Utility types
 */

// Example: Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

// Example: Pagination params
export interface PaginationParams {
  page: number;
  limit: number;
}

// Example: Nullable utility type
export type Nullable<T> = T | null;
