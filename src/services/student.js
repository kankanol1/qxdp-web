import request from "@/utils/request";

export async function queryData(payload){
  return request(`/api/students/query`,{
    method:'POST',
    params:payload,
  });
}export async function queryDataAll(payload){
  return request(`/api/students/all`,{
    method:'POST',
    params:payload,
  });
}
export async function searchData(payload){
  return request(`/api/students/search`,{
    method:'POST',
    params:payload,
  });
}
export async function courseS(payload){
  return request(`/api/students/courses`,{
    method:'POST',
    params:payload,
  });
}
export async function courseSA(payload){
  return request(`/api/students/coursesa`,{
    method:'POST',
    params:payload,
  });
}
