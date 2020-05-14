import request from '@/utils/request';

export async function getRoles(){
  return request('/api/sys/roles',{
    method:'POST',
  });
}
export async function members(data){
  return request('/api/sys/members',{
    method:'POST',
    params:data
  });
}
