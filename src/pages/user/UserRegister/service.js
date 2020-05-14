import request from '@/utils/request';

export async function fakeRegister(params) {
  return request('/api/general/user/management/register/nm', {
    method: 'POST',
    data: params,
  });
}
export async function verification(params) {
  return request('/api/general/user/management/register/su', {
    method: 'POST',
    params: params,
  });
}

