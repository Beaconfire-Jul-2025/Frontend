import axios from 'axios';

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

const API_BASE_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3001';

const authAPI = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await authAPI.post<LoginResponse>('/api/login', credentials);
    return response.data;
};

export default authAPI;