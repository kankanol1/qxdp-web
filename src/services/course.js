import request from "@/utils/request";

export async function queryData(payload){
  return request(`/api/course/query`,{
    method:'POST',
    params:payload,
  });
}export async function queryDataAll(payload){
  return request(`/api/course/all`,{
    method:'POST',
    params:payload,
  });
}
export async function searchData(payload){
  return request(`/api/course/search`,{
    method:'POST',
    params:payload,
  });
}
