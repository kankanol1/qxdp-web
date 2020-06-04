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
