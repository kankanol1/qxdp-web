/**
 * Created by lidianzhong on 2020-06-22.
 * To: More pain, more gain.
 */

import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import { DoubleLeftOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import {connect} from 'dva';
import IntroCom from "./components/IntroCom";
import {Row, Col, Tabs, Button} from 'antd';
import StudentsCom from "./components/StudentsCom";
import StudentfCom from "./components/StudentfCom";
import styles from './styles.less'
const { TabPane } = Tabs;

const UserFeedbackPage = props => {
  const {location,dispatch} = props;
  const {state} = location;

  const operations=(<Button type={"primary"}>导出</Button>)
  return (<div style={{padding:20}}>
    <PageHeaderWrapper pageHeaderRender={e => {
      const data = e.breadcrumb.routes;
      return (<div style={{paddingTop: 20, paddingLeft: 20}}>
        <Link to={"/users"}><DoubleLeftOutlined/>{data[1] ? data[1].breadcrumbName : null}</Link>
        <span style={{padding: "0 10px"}}>|</span>
        <span>人员管理</span>
      </div>)
    }} title={false}>
      <div className={styles["advice-style"]}>
        <Row>
          <Col span={12}>
            <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
              <TabPane tab="管理员" key="1">
                <StudentsCom />
              </TabPane>
              <TabPane tab="审核员" key="2">
                <StudentfCom/>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={12} style={{padding:50}}>
            <IntroCom state={state}/>
          </Col>
        </Row>
      </div>
    </PageHeaderWrapper>
  </div>)
}
export default connect()(UserFeedbackPage);
