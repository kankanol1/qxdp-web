import {getRoles,members} from '../services/roles';

const Model = {
  namespace: "roles",
  state: {
    roles: [],
    data:[],
  },
  effects: {
    * roles(_,{call, put}) {
      const response = yield call(getRoles);
      yield put({
        type:'getData',
        payload:response.data,
      });
    },

    * members({payload},{call, put}) {
      const response = yield call(members,payload);
      yield put({
        type:'changeData',
        payload:response.data,
      });
    },

  },
  reducers: {
    getData(state, {payload}) {
      return {...state, data:payload}
    },
    changeData(state, {payload}) {
      return {...state, data:state.data.map(i=>(payload.key===i.key?payload:i))}
    },
    changeRoles(state, {payload}) {
      return {...state, roles:payload}
    },
  }
};
export default Model;
