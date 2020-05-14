import request from '@/utils/request';

export async function getTableData(){
  return request(`/api/get_test_data`,{
    method:'POST',
  });
}

export async function onChangeItemE(payload){
  console.log(payload);
  return request(`/api/change_item_data`,{
    method:'POST',
    params:payload,
  });
}
export async function deleteItem(payload){
  return request(`/api/delete_item_data`,{
    method:'POST',
    params:payload,
  });
}
export async function addItem(payload){
  return request(`/api/add_item_data`,{
    method:'POST',
    params:payload,
  });
}
