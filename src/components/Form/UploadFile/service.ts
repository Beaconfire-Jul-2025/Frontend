import { request } from '@umijs/max';
import type { PreSignedRequest, PreSignedResponse } from './data';

export async function getPreSignedUrl(params: PreSignedRequest) {
  return request<PreSignedResponse>('/api/pre-signed', {
    method: 'POST',
    data: params,
  });
}

