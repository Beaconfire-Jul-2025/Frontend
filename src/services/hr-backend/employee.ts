import {request} from '@umijs/max';
import type {EmployeeListResponse} from '@/components/EmployeeTable/data';

export async function getEmployeeProfiles(params?: {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}): Promise<EmployeeListResponse['data']> {
  const res = await request('/api/employee', {
    method: 'GET',
    params,
  });
  return res.data;
}

export async function getEmployeeProfileById(userId: string): Promise<any> {
  const res = await request(`/api/employee/${userId}`, {
    method: 'GET',
  });
  return res.data;
}

export async function getEmployeePersonalProfile() {
  return request('/api/employee/profile', {
    method: 'GET',
  });
}

export async function getRoommates() {
  return request(`/api/employee/roommate`, {
    method: 'GET',
  });
}
