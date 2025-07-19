import {request} from '@umijs/max';

/**
 * 获取当前用户信息（Composite）
 * @returns {Promise<any>}
 */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/composite/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function postVisaApplication(data: any) {
  return fetch('/api/composite/application/visa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

/**
 * Send invitation to new employee
 * @param {Object} data - { email: string, userId?: number }
 * @returns {Promise<any>}
 */
export async function sendInvitation(data: { email: string; userId?: number }) {
  return request('/api/composite/invite', {
    method: 'POST',
    data,
  });
}
