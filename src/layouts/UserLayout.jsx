import {DefaultFooter, getMenuData, getPageTitle} from '@ant-design/pro-layout';
import {Helmet} from 'react-helmet';
import React from 'react';
import {formatMessage} from 'umi-plugin-react/locale';
import {Row ,Col,message} from 'antd';
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
  message.info({
    content:<span>账号：gl2020  密码：gl2020</span>,
    duration:1000*1000,
  })
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
          <div style={{padding:"0 50px"}}>
            <img alt="logo" className={styles.logo} src={logo}/>
            <span className={styles.title}>趣学岛</span>
          </div>
          <Row>
            <Col offset={12}>
              <div style={{marginTop:50}}>
                {children}
              </div>
            </Col>
          </Row>
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
