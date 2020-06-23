/**
 * Created by lidianzhong on 2020-06-22.
 * To: More pain, more gain.
 */

import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import { DoubleLeftOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import {connect} from 'dva';
import IntroCom from "../components/IntroCom";
import {Row, Col,Tabs} from 'antd';
import StudentsCom from "../components/StudentsCom";
import StudentfCom from "../components/StudentfCom";
import styles from '../styles.less'
const { TabPane } = Tabs;

const UserFeedbackPage = props => {
  const {location,dispatch} = props;
  const {state} = location;

  return (<div style={{padding:20}}>
    <PageHeaderWrapper pageHeaderRender={e => {
      const data = e.breadcrumb.routes;
      return (<div style={{paddingTop: 20, paddingLeft: 20}}>
        <Link to={"/users"}><DoubleLeftOutlined/>{data[1] ? data[1].breadcrumbName : null}</Link>
        <span style={{padding: "0 10px"}}>|</span>
        <span>课程详情</span>
      </div>)
    }} title={false}>
      <div className={styles["advice-style"]}>
        <Row>
          <Col span={12}>
            <IntroCom state={state}/>
          </Col>
          <Col span={12}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="佣金收入" key="1">
                <StudentsCom title={"佣金收入：20"} data={state}/>
              </TabPane>
              <TabPane tab="开课收入" key="2">
                <StudentfCom title={"课程收入：30"} data={state}/>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </PageHeaderWrapper>
  </div>)
}
export default connect()(UserFeedbackPage);
