import request from "@/utils/request";
export async function passstart(params) {
  return request('/api/general/user/mt/mm/rs/su', {
    method: 'POST',
    params: params,
  });
}

export async function verification(params) {
  return request('/api/general/user/mt/mm/rs/nm', {
    method: 'POST',
    data: params,
  });
}
