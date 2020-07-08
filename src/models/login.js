import { stringify } from 'querystring';
import { router } from 'umi';
import { fakeAccountLogin,loginnm,loginsu } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import Cookies from '@/utils/cookies'
import Algorithm from "@/utils/Algorithm";
import key from '@/utils/key';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    type:'admin',
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully


      if ((response.status&0b11) === 0b01) {

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^(\/).*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/gl/';
            return;
          }
        }
        router.replace(redirect?redirect.split('gl')[1] :'/');
      }
    },
    *loginsu({ payload,callback }, { call, put }) {
      const response = yield call(loginsu, payload);
      if(callback&&typeof callback==='function'){
        callback(response);
      }
    },
    *loginnm({ payload }, { call, put }) {
      const response = yield call(loginnm, payload);
      Cookies.setCookie('un',payload.un,1000);
      if(payload.remember){
        Cookies.setCookie('pw',Algorithm.RSAEn(payload.password,key.pk),1000);
      }else{
        Cookies.setCookie('pw','',-1)
      }

      if(!response.currentAuthority){
        response.currentAuthority=[
          'admin',
          'user','doors1','doors2','doors3',
          'sales1','sales2','sales3','sales4',
          'product1','product2','product3','product4',
          'human1','human2','human3','human4',
          'office1','office2','office3','office4',
          'data',
          'authority']
      }
      let currentAuthority=[];

      response.currentAuthority.map(i=>{
        if(typeof i==='string'){
          currentAuthority.push(i);
        }else if(Array.isArray(i)){
          currentAuthority=currentAuthority.concat(i);
        }
      });
      yield put({
        type: 'changeLoginStatus',
        payload: {...response,currentAuthority},
      }); // Login successfully

      if ((response.status&0b11) === 0b01) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^(\/).*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/qxd/';
            return;
          }
        }
        router.replace(redirect?redirect.split('qxd')[1] :'/');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        localStorage.clear();
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
    *logp({ response }, { call, put }) {

      if(!response.currentAuthority){
        response.currentAuthority=['admin']
      }
      let currentAuthority=[];

      response.currentAuthority.map(i=>{
        if(typeof i==='string'){
          currentAuthority.push(i);
        }else if(Array.isArray(i)){
          currentAuthority=currentAuthority.concat(i);
        }
      });
      yield put({
        type: 'changeLoginStatus',
        payload: {...response,currentAuthority},
      }); // Login successfully

      if (response.status==='ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        //http://localhost:8000/qxd/user/login?redirect=http%3A%2F%2Flocalhost%3A8000%2Fqxd%2Ffeedback
        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^(\/).*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/qxd/';
            return;
          }
        }
        // router.replace(redirect?redirect.split('qxd')[1] :'/');
        router.replace('/');
      }
    },

  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
