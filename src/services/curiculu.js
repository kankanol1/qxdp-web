import request from "@/utils/request";

export async function getTableData(){
  return request(`/api/get_check_data`,{
    method:'POST',
  });
}
export async function queryData(payload){
  return request(`/api/query_check_data`,{
    method:'POST',
    params:payload,
  });
}
export async function add(payload){
  return request(`/api/sys/course/add`,{
    method:'POST',
    data:payload,
  });
}
