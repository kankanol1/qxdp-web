const getNotices = (req, res) => {
  res.json([
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2017-08-09',
      type: 'notification',
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '你推荐的 曲妮妮 已通过第三轮面试',
      datetime: '2017-08-08',
      type: 'notification',
    },
    {
      id: '000000003',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      title: '这种模板可以区分多种通知类型',
      datetime: '2017-08-07',
      read: true,
      type: 'notification',
    },
    {
      id: '000000004',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: '左侧图标用于区分不同的类型',
      datetime: '2017-08-07',
      type: 'notification',
    },
    {
      id: '000000005',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '内容不要超过两行字，超出时自动截断',
      datetime: '2017-08-07',
      type: 'notification',
    },
    {
      id: '000000006',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '曲丽丽 评论了你',
      description: '描述信息描述信息描述信息',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true,
    },
    {
      id: '000000007',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '朱偏右 回复了你',
      description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true,
    },
    {
      id: '000000008',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '标题',
      description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true,
    },
    {
      id: '000000009',
      title: '任务名称',
      description: '任务需要在 2017-01-12 20:00 前启动',
      extra: '未开始',
      status: 'todo',
      type: 'event',
    },
    {
      id: '000000010',
      title: '第三方紧急代码变更',
      description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      extra: '马上到期',
      status: 'urgent',
      type: 'event',
    },
    {
      id: '000000011',
      title: '信息安全考试',
      description: '指派竹尔于 2017-01-09 前完成更新并发布',
      extra: '已耗时 8 天',
      status: 'doing',
      type: 'event',
    },
    {
      id: '000000012',
      title: 'ABCD 版本发布',
      description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      extra: '进行中',
      status: 'processing',
      type: 'event',
    },
  ]);
};
const getMenu=(req,res)=>{
  res.join([
    {
      "path": "/company",
      "component": "../layouts/UserLayout",
      "routes": [
        {
          "path": "/company",
          "redirect": "/company/database"
        },
        {
          "name": "数据配置",
          "path": "/company/database",
          "component": "./company/Database"
        },
        {
          "name": "企业注册",
          "path": "/company/register",
          "component": "./company/Register"
        },
        {
          "name":"结果页",
          "path": "/company/result",
          "component": "./company/RegisterResult"
        }
      ]
    },
    {
      "path": "/user",
      "component": "../layouts/UserLayout",
      "routes": [
        {
          "name":"login",
          "path": "/user/login",
          "component": "./userlogin"
        },
        {
          "name":"register",
          "path": "/user/register",
          "component": "./userUserRegister"
        },
        {
          "name":"registers",
          "icon": "smile",
          "path": "/user/result",
          "component": "./useUserRegisterResult"
        }
      ]
    },
    {
      "path": "/",
      "component": "../lauouts/SecurityLayout",
      "routes": [
        {
          "path": "/",
          "component": "../layouts/BasicLayout",
          "authority": ["admin", "user"],
          "routes": [
            {
              "path": "/",
              "redirect": "/index"
            },
            {
              "path": "/index",
              "name": "企业门户",
              "icon": "home",
              "component": "./Enterprise",
              "hideChildrenInMenu":true,
              "routes":[
                {
                  "path": "/index",
                  "name": "企业门户",
                  "icon": "home",
                  "component": "./Enterprise"
                },
                {
                  "path": "/index",
                  "name": "企业门户",
                  "icon": "home",
                  "component": "./Enterprise"
                },
                {
                  "path": "/index",
                  "name":"企业门户",
                  "icon": "home",
                  "component": "./Enterprise"
                }
              ]
            },
            {
              "path": "/sales",
              "name": "销售管理",
              "icon":"FundProjectionScreen",
              "component": "./SalesManagement"
            },
            {
              "path": "/product",
              "name":"生产管理",
              "icon": "partition",
              "component": "./ProductionManagement"
            },
            {
              "path": "/human",
              "name":"人力管理",
              "icon": "team",
              "component": "./HumanResource"
            },
            {
              "path": "/office",
              "name": "OA一体化",
              "icon": "laptop",
              "component": "./OfficeAutomatic"
            },
            {
              "path": "/app",
              "name": "全部应用",
              "icon": "appstore",
              "component": "./Appstore",
              "hideInMenu":true
            },

            {
              "path": "/data",
              "name":"数据测试",
              "icon": "PlayCircle",
              "component": "./data",
              "authority": ["admin"]
            },
            {
              "path": "/admin",
              "name": "admin",
              "icon": "crown",
              "component": "./Admin",
              "authority": ["admin"],
              "routes": [
                {
                  "path": "/admin/sub-page",
                  "name": "sub-page",
                  "icon": "smile",
                  "component": "./Welcome",
                  "authority": ["admin"]
                }
              ]
            },
            {
              "component": "./404"
            }
          ]
        },
        {
          "component": "./404"
        }
      ]
    },
    {
      "component": "./404"
    }
  ]);
};
export default {
  'GET /api/notices': getNotices,
  'GET /api/menu': getMenu,
};
