import {queryData,searchData,queryDataAll } from './service';

const Model = {
  namespace:'courcespace',
  state:{
    dataSource:[],
  },
  effects:{
    *search({payload},{call,put}){
      const response = yield call(searchData,payload);
      yield put({
        type: 'change',
        payload: response,
      })
    },
    *query({payload},{call,put}){
      const response = yield call(queryData,payload);
      yield put({
        type: 'change',
        payload: response,
      })
    },
    *all({payload,callback},{call,put}){
      const response = yield call(queryDataAll,payload);
      if(callback && typeof callback ==='function'){
        callback({
          status:'ok',
          dataSource: response.dataSource
        })
      }
    }
  },
  reducers:{
    change(state,{payload}){
      return {...state,...payload}
    }
  }

};

export default Model;
