import request from "@/utils/request";

export async function getTableData(){
  return request(`/api/get_data`,{
    method:'POST',
  });
}
export async function queryData(payload){
  console.log(payload);

  return request(`/api/query_data`,{
    method:'POST',
    params:payload,
  });
}
