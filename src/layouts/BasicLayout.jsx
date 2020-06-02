import ProLayout, {SettingDrawer} from '@ant-design/pro-layout';
import React, {useEffect} from 'react';
import {Link} from 'umi';
import {connect} from 'dva';
import {router} from 'umi';
import {Result, Button} from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import {getAuthorityFromRouter} from '@/utils/utils';
import logo from '../assets/logo.svg';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="对不起，暂无权限."
    extra={
      <Button type="primary" onClick={() => router.go(-1)}>
        返回
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = {...item, children: item.children ? menuDataRender(item.children) : []};
    return Authorized.check(item.authority, localItem, null);
  });

const BasicLayout = props => {

  const {
    dispatch,
    children,
    settings,
    menuData,
    location = {
      pathname: '/',
    },
  } = props;


  /**
   * constructor
   */


  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };


  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  return (
    <>
      <ProLayout
        logo={logo}
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            {logoDom}
            {titleDom}
          </Link>
        )}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return defaultDom;
          }

          /* <svg className={styles.icon} aria-hidden="true">
              <use xlinkHref="#icon-shouye"/>
            </svg>*/
          // return <Link to={menuItemProps.path}><span style={{fontSize: 16}}>{defaultDom}</span></Link>;
          return <Link
            to={{pathname: menuItemProps.path, state: {name: menuItemProps.name}}}><span>{defaultDom}</span></Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}><span style={{fontSize: 16}}>{route.breadcrumbName}</span></Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        // menuDataRender={() => menuData}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent/>}
        {...props}
        {...settings}
        contentStyle={{backgroundColor:'#fff',}}
      >
          <Authorized authority={authorized.authority} noMatch={noMatch}>
            {children}
          </Authorized>

      </ProLayout>
      {/*<SettingDrawer
        settings={settings}
        onSettingChange={(config) =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />*/}
      </>
  );
};


export default connect(({global, settings}) => ({
  collapsed: global.collapsed,
  menuData: global.menuData,
  settings,
}))(BasicLayout);
