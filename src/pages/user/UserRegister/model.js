import { fakeRegister ,verification,saveOne} from './service';
const Model = {
  namespace: 'userAndUserRegister',
  state: {
    status: undefined,
    emailList:['@gl-data.com','@qq.com', '@163.com', '@139.com'],
  },
  effects: {
    *submit({ payload,callback}, { call, put }) {
      const response = yield call(fakeRegister, payload);
      if(callback&&typeof callback==='function'){
        if(callback&& typeof callback==='function'){
          callback(response);
        }
      }
    },
    *verification({ payload,callback}, { call, put }) {
      const response = yield call(verification, payload);
      if(callback&&typeof callback==='function'){
        if(callback&& typeof callback==='function'){
          callback(response);
        }
      }
    },
    *save({ payload,callback}, { call, put }){
      // console.log("model",payload);
      const response = yield call(saveOne, payload);
      if(callback&&typeof callback==='function'){
        if(callback&& typeof callback==='function'){
          callback({status:'ok',data:response});
        }
      }
    }
  },
  reducers: {
    registerHandle(state, { payload }) {
      return { ...state, status: payload.status };
    },
  },
};
export default Model;
