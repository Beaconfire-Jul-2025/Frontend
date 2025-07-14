import axios from "axios";
import type { Employee } from "@/types/employee";

const employeeAPI = axios.create({
  baseURL: "/api/employee",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
employeeAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getEmployeeProfile = async (): Promise<Employee> => {
  const response = await employeeAPI.get<Employee>("/");
  return response.data;
};

export const getEmployeeAvatar = async (): Promise<string> => {
  const response = await employeeAPI.get<{ avatarPath: string }>("/avatar");
  return response.data.avatarPath;
};

export default employeeAPI;
