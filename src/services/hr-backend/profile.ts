import {request} from '@umijs/max';

export async function getEmployeeProfile() {
  return request('/api/employee/profile', {
    method: 'GET',
  });
}

