import {DefaultFooter, getMenuData, getPageTitle} from '@ant-design/pro-layout';
import {Helmet} from 'react-helmet';
import React from 'react';
import {formatMessage} from 'umi-plugin-react/locale';
import {Row ,Col,message} from 'antd';
import {Link} from "umi";
import {connect} from 'dva';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const {routes = []} = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const {breadcrumb} = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title}/>
      </Helmet>
      <div className={styles.container}>
        <div className={styles.content}>
          {/*<div className={styles.top}>
            <div className={styles.header}>
              <div>
                <img alt="logo" className={styles.logo} src={logo}/>
                <span className={styles.title}>趣学岛</span>
              </div>
            </div>
            <div className={styles.desc}>趣学岛，你值得拥有！</div>
          </div>*/}
          <div style={{padding:"10px 30px",height:70}}>
            <Row>
              <Col span={4}>
                <img alt="logo" className={styles.logo} src={logo}/>
                <span className={styles.title}>趣学岛</span>
              </Col>
            {/*  <Col offset={16} span={2}>
                <Link style={{lineHeight:"50px"}} to={{pathname:'/qxd/user/login'}}>登录</Link>
              </Col>
              <Col span={2}>
                <Link style={{lineHeight:"50px"}} to={{pathname:'/qxd/user/register'}}>注册</Link>
              </Col>*/}
            </Row>
            <Row>
              <Col span={24} className={styles.context} style={{textAlign: 'center',fontSize:'16px'}}>
                社群优势、专为社群打造的平台工具 <br/>
                知识付费已成为广大用户所接受和喜欢的新的学习方式
              </Col>
            </Row>
          </div>
              <div style={{marginTop:140}}>
                {children}
              </div>
        </div>
        <DefaultFooter
          copyright="2020 qxd 版权所有"
          links={[]}
        />
      </div>
    </>
  );
};

export default connect(({settings}) => ({...settings}))(UserLayout);
