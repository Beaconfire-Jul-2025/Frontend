import axios from "axios";
import type { Employee } from "@/types/employee";

const employeeAPI = axios.create({
  baseURL: "/api/employee",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PagingParams {
  current?: number;
  pageSize?: number;
  sorter?: Record<string, "ascend" | "descend">;
  filter?: Record<string, (string | number)[]>;
}

export type View = "roommate" | "application" | "profile" | "visa" | "hiring";

export interface PageResult<T = unknown> {
  data: T[];
  total: number;
  success: boolean;
}

// Add auth token to requests
employeeAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getEmployeeProfile = async (): Promise<Employee> => {
  const response = await employeeAPI.get<Employee>("/profile");
  return response.data;
};

export const getEmployeeAvatar = async (): Promise<string> => {
  const response = await employeeAPI.get<{ avatarPath: string }>("/avatar");
  return response.data.avatarPath;
};

export async function queryEmployee(
  params: PagingParams & { view: View; name?: string },
): Promise<PageResult> {
  const { current = 1, pageSize = 20, ...rest } = params;
  const { data } = await employeeAPI.get<PageResult>("/", {
    params: {
      page: current,
      pageSize,
      ...rest,
    },
  });
  return data;
}

export default employeeAPI;
