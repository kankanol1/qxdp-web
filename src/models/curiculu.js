import {getTableData,queryData,add} from '@/services/curiculu';

const Model = {
  namespace:'curriculu',
  state:{
    dataSource:[],
  },
  effects:{
    *get(_,{call,put}){
      const response = yield call(getTableData);
      yield put({
        type: 'change',
        payload: response,
      })
    },
    *add({payload,callback},{call,put}){
      const response = yield call(add,payload);
     if(callback && typeof callback ==='function'){
       callback({status:'ok',data:response})
      }
    },
    *query({payload},{call,put}){
      const response = yield call(queryData,payload);
      yield put({
        type: 'change',
        payload: response,
      })
    }
  },
  reducers:{
    change(state,{payload}){
      return {...state,...payload}
    }
  }

};

export default Model;
