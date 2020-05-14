import { fakeRegister ,verification} from './service';
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
  },
  reducers: {
    registerHandle(state, { payload }) {
      return { ...state, status: payload.status };
    },
  },
};
export default Model;
