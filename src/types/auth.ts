export type UserRole = "ADMIN" | "EDITOR" | "USER" | string;

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  title: string | null;
  role: UserRole;
  lastLoginAt: string | null;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  expiresIn: number;
  csrfToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}