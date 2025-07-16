import { request } from '@umijs/max';

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

