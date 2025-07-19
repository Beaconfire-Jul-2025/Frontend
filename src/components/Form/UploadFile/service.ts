import { request } from '@umijs/max';
import type { PreSignedRequest } from './data';

export async function getPreSignedUrl(params: PreSignedRequest) {
  const response = await request<any>('/api/composite/presigned-url', {
    method: 'POST',
    data: params,
  });
  // Map backend 'key' to frontend 'objectKey'
  return {
    presignedUrl: response.data.presignedUrl,
    objectKey: response.data.key,
  };
}
