import {passstart,verification}  from './service';

const Model = {
  namespace:'changepw',
  state:{},
  effects:{
    *start({ payload,callback}, { call, put }) {
      const response = yield call(passstart, payload);
      if(callback&&typeof callback==='function'){
        if(callback&& typeof callback==='function'){
          callback(response);
        }
      }
    },*verification({ payload,callback}, { call, put }) {
      const response = yield call(verification, payload);
      if(callback&&typeof callback==='function'){
        if(callback&& typeof callback==='function'){
          callback(response);
        }
      }
    },
  },
  reducers:{

  }
}
export default Model;
