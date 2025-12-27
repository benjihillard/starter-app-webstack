export interface User {
  id: number;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
  createdAt: Date;
}

/**
 * Transforms a User to a safe response (excludes password)
 */
export const toUserResponse = (user: User): UserResponse => ({
  id: user.id,
  email: user.email,
  createdAt: user.createdAt,
});
