import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}


export async function loginnm(params) {
  return request('/api/general/user/management/li/nm', {
    method: 'POST',
    data: params,
  });
}
export async function loginsu(params) {
  return request('/api/general/user/management/li/su', {
    method: 'POST',
    params: params,
  });
}

