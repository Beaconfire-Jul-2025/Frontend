export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  username: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export type UserRole = "HR" | "Employee";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
}
