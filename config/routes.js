import React from "react";
import {
  LayoutOutlined,
  SettingOutlined,
  AppstoreOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MonitorOutlined,
  FundProjectionScreenOutlined,
  PartitionOutlined,
  UserSwitchOutlined,
  TeamOutlined,
  LaptopOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';

/*
*
* hideChildrenInMenu:true,//是否隐藏子菜单
* redirect:'/',
* hideInMenu: true,是否隐藏菜单
* component: './data',組件
* authority:['data'],
* */

const routerAll=[
  {
    path: '/doors',
    name: '企业门户',
    icon: 'layout',
    img:<LayoutOutlined style={{marginRight:4}}/>,
    component: './Enterprise',
    authority:['doors1','doors2','doors3'],
    routes:[
      {
        path: '/doors/i1',
        name: '企业门户1',
        icon: 'layout',
        img:<LayoutOutlined style={{marginRight:4}}/>,
        component: './Enterprise',
        authority:['doors1'],
      },
      {
        path: '/doors/i2',
        name: '企业门户2',
        icon: 'layout',
        img:<LayoutOutlined style={{marginRight:4}}/>,
        component: './Enterprise',
        authority:['doors2'],
      },
      {
        path: '/doors/i3',
        name: '企业门户3',
        icon: 'layout',
        img:<LayoutOutlined style={{marginRight:4}}/>,
        component: './Enterprise',
        authority:['doors3'],
      },
    ],
  },
  {
    path: '/sales',
    name: '销售管理',
    icon:'FundProjectionScreen',
    img:<FundProjectionScreenOutlined style={{marginRight:4}}/>,
    authority:['sales1','sales2','sales3','sales4'],
    routes:[
      {
        path: '/sales/s1',
        name: '销售管理1',
        img:<FundProjectionScreenOutlined style={{marginRight:4}}/>,
        icon:'FundProjectionScreen',
        component: './SalesManagement',
        authority:['sales1'],
      },
      {
        path: '/sales/s2',
        name: '销售管理2',
        icon:'FundProjectionScreen',
        img:<FundProjectionScreenOutlined style={{marginRight:4}}/>,
        component: './SalesManagement',
        authority:['sales2'],
      },
      {
        path: '/sales/s3',
        name: '销售管理3',
        icon:'FundProjectionScreen',
        img:<FundProjectionScreenOutlined style={{marginRight:4}}/>,
        component: './SalesManagement',
        authority:['sales3'],
      },
      {
        path: '/sales/s4',
        name: '销售管理4',
        icon:'FundProjectionScreen',
        img:<FundProjectionScreenOutlined style={{marginRight:4}}/>,
        component: './SalesManagement',
        authority:['sales4'],
      },
    ]
  },
  {
    path: '/product',
    name: '生产管理',
    icon: 'partition',
    img:<PartitionOutlined style={{marginRight:4}}/>,
    authority:['product1','product2','product3','product4'],
    routes:[
      {
        path: '/product/p1',
        name: '生产管理1',
        icon: 'partition',
        img:<PartitionOutlined style={{marginRight:4}}/>,
        component: './ProductionManagement',
        authority:['product1'],
      },
      {
        path: '/product/p2',
        name: '生产管理2',
        icon: 'partition',
        img:<PartitionOutlined style={{marginRight:4}}/>,
        component: './ProductionManagement',
        authority:['product2'],
      },
      {
        path: '/product/p3',
        name: '生产管理',
        icon: 'partition',
        img:<PartitionOutlined style={{marginRight:4}}/>,
        component: './ProductionManagement',
        authority:['product3'],
      },
      {
        path: '/product/p4',
        name: '生产管理4',
        icon: 'partition',
        img:<PartitionOutlined style={{marginRight:4}}/>,
        component: './ProductionManagement',
        authority:['product4'],
      },
    ],
  },
  {
    path: '/human',
    name: '人资管理',
    icon: 'team',
    img:<TeamOutlined style={{marginRight:4}}/>,
    authority:['human1','human2','human3','human4'],
    routes:[
      {
        path: '/human/h1',
        name: '人资管理1',
        icon: 'team',
        img:<TeamOutlined style={{marginRight:4}}/>,
        component: './HumanResource',
        authority:['human1'],
      },
      {
        path: '/human/h2',
        name: '人资管理2',
        icon: 'team',
        img:<TeamOutlined style={{marginRight:4}}/>,
        component: './HumanResource',
        authority:['human2'],
      },
      {
        path: '/human/h3',
        name: '人资管理3',
        icon: 'team',
        img:<TeamOutlined style={{marginRight:4}}/>,
        component: './HumanResource',
        authority:['human3'],
      },
      {
        path: '/human/h4',
        name: '人资管理4',
        icon: 'team',
        img:<TeamOutlined style={{marginRight:4}}/>,
        component: './HumanResource',
        authority:['human4'],
      }
    ]
  },
  /*{
    path: '/office',
    name: 'OA一体化',
    icon: 'laptop',
    img:<LaptopOutlined style={{marginRight:4}}/>,
    authority:['office1','office2','office3','office4'],
    routes:[
      {
        path: '/office/o1',
        name: 'OA一体化1',
        icon: 'laptop',
        img:<LaptopOutlined style={{marginRight:4}}/>,
        authority:['office1'],
        component: './OfficeAutomatic',
      },
      {
        path: '/office/o2',
        name: 'OA一体化2',
        icon: 'laptop',
        img:<LaptopOutlined style={{marginRight:4}}/>,
        component: './OfficeAutomatic',
        authority:['office2'],
      },
      {
        path: '/office/o3',
        name: 'OA一体化3',
        icon: 'laptop',
        img:<LaptopOutlined style={{marginRight:4}}/>,
        component: './OfficeAutomatic',
        authority:['office3'],
      },
      {
        path: '/office/o4',
        name: 'OA一体化4',
        icon: 'laptop',
        img:<LaptopOutlined style={{marginRight:4}}/>,
        component: './OfficeAutomatic',
        authority:['office4'],
      },
    ]
  },*/

  /*{
    path: '/app',
    name: '全部应用',
    icon: 'appstore',
    img: <AppstoreOutlined style={{marginRight:4}}/>,
    component: './AppStore',
    authority:['admin','human','office','sales','doors'],
  },*/
  {
    name: '数据测试',
    icon: 'PlayCircle',
    path: '/data',
    routes:[
      {
        path:'/data',
        redirect:'/data/data'
      },
      {
        path: '/data/data',
        name: ' 数据流程测试',
        icon: 'PlayCircle',
        img: <PlayCircleOutlined style={{marginRight:4}}/>,
        component: './data/data',
      },
      {
        path: '/data/ding',
        name: ' 单元格编辑',
        icon: 'PlayCircle',
        img: <PlayCircleOutlined style={{marginRight:4}}/>,
        component: './data/ding',
      },
    ]
  },
  {
    path: '/authority',
    name: ' 权限管理',
    icon: 'crown',
    img: <UserSwitchOutlined style={{marginRight:4}}/>,
    component: './Authority',
    authority:['authority'],
  },
/*  {
    component: './404',
  }*/
  ];
/*let authority=[];
if(!!localStorage){
  authority= JSON.parse(localStorage.getItem("user-info"));
}*/
// export default routerAll.filter(i=>authority.filter(j=>(!i.authority)||(j===i.path.substring(1))).length);
// export default routerAll.filter(i=>i.path);
export default routerAll;
