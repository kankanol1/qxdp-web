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
export async function saveOne(params) {
  // console.log();
  request("/api/user/saveOne",{
    method:'POST',
    data:params,
  })
}

