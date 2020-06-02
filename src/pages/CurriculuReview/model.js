import {getTableData,queryData} from './service';

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
