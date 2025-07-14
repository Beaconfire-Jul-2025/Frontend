import axios from "axios";

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

const authAPI = axios.create({
  baseURL: "/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const response = await authAPI.post<LoginResponse>("/login", credentials);
  return response.data;
};

export default authAPI;
