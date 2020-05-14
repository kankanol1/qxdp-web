import {getTableData,addItem, deleteItem, onChangeItemE} from "./service";

const Model = {
  namespace: 'dynamicSpace',
  state: {
    columns: [],
    data: [],
    layout: []
  },
  effects: {// 异步请求 请求后台
    * get({callback}, {call, put}) {
      const response = yield call(getTableData);
      if (callback && typeof callback === 'function') {
        callback({status: 'ok'});
      }
      yield put({
        type: 'change',
        payload: response,
      });
    },
    * changeItemE({payload, callback}, {call, put}) {
      const response = yield call(onChangeItemE, payload);
      if (response.status === "ok") {
        const response = yield call(getTableData);
        yield put({
          type: 'change',
          payload: response,
        });
      }
    },
    * deleteItem({payload,callback}, {call, put}) {
      const response = yield call(deleteItem, payload);
      if (response.status === "ok") {
        if (callback && typeof callback === 'function') {
          callback({status: 'ok'});
        }
        const response = yield call(getTableData);
        yield put({
          type: 'change',
          payload: response,
        });
      }
    },
    * add({payload}, {call, put}) {
      const response = yield call(addItem, payload);
      if (response.status === "ok") {
        const response = yield call(getTableData);
        yield put({
          type: 'change',
          payload: response,
        });
      }
    }
  },
  reducers: {// 前端请求 修改前端数据内容
    change(state, {payload}) {
      return {...state, ...payload};
    },
    filter(state, {payload}) {
      return {
        ...state,
        data: state.data.filter(item => {
          return item[payload.dataIndex] === payload.value
        })
      }
    },
    delete(state, {payload}) {
      return {
        ...state,
        data: state.data.filter(item => item.key !== payload.key)
      }
    },
    changeItem(state, {payload}) {
      return {...state, data: state.data.map(item => parseInt(item.key) === parseInt(payload.key) ? payload : item)};
    },
  }
}

export default Model;
