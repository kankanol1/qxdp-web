import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
import React from "react";

const {pwa} = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const {ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV} = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],

];
const publicPath = '/qxd/';
if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

// 开启主题设置
// plugins.push(['umi-plugin-antd-theme', themePluginConfig]);

export default {
  plugins,
  targets: {
    ie: 11,
  },

  routes: [

    {
      path: '/user',
      component: '../layouts/UserLayout',
      hideInMenu: true,
      routes: [
        {
          path: '/user',
          redirect: '/user/logins',
        },
        {
          name: 'logins',
          path: '/user/logins',
          component: './user/login/logins',
        },
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        {
          name: 'register',
          path: '/user/register',
          component: './user/UserRegister',
        },
        {
          name: 'registers',
          icon: 'smile',
          path: '/user/result',
          component: './user/UserRegisterResult',
        },

      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/feedback',
            },
            {
              name: '用户反馈',
              path: '/feedback',
              component: './UserFeedback',
            },
            {
              name: '举报/意见反馈',
              path: '/feedback/advice',
              component: './UserFeedback/FeedbackResult',
              hideInMenu:true,
            },
            {
              name: '课程审核',
              path: '/check',
              component: './CurriculuReview',
            },
            {
              name: '审核',
              path: '/check/check',
              hideInMenu:true,
              component: './CurriculuReview/CheckPage',
            },
            {
              name: '课程管理',
              path: '/cources',
              component: './CourceManagement',
            },
            {
              name: '审核',
              path: '/cources/manage',
              hideInMenu:true,
              component: './CourceManagement/CheckPage',
            },
            {
              name: '用户管理',
              path: '/users',
              component: './UserManagement',
            },
            {
              name: '用户管理',
              path: '/users/manage',
              hideInMenu:true,
              component: './UserManagement/CheckPage',
            },
            {
              name: '人员管理',
              path: '/person',
              component: './PersonManagement',
            },
            {
              name: '人员管理',
              path: '/person/manage',
              hideInMenu:true,
              component: './PersonManagement/CheckPage',
            },
            {
              name: '测试',
              path: '/data',
              hideInMenu:true,
              component: './data',
              routes: [
                {
                  path: '/data',
                  redirect: './data/data'
                },
                {
                  name: '数据',
                  path: '/data/data',
                  component: './data/data',
                }, {
                  name: '数据',
                  path: '/data/ding',
                  component: './data/ding',
                },{
                  name: '数据',
                  path: '/data/tables',
                  component: './data/tables',
                },
              ]
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: publicPath,

  },
  base: publicPath, //最终输出路径
  publicPath: publicPath,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  hash: true,
  history:'hash',
  chainWebpack: webpackPlugin,
};
