import { request } from '@umijs/max';
import type { EmployeeListResponse } from './data';

export async function fetchEmployees(params: Record<string, any>) {
  return request<EmployeeListResponse>('/api/composite/employees', {
    method: 'GET',
    params,
  });
}
