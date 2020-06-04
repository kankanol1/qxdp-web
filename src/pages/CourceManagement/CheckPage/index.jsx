/**
 * Created by lidianzhong on 2020-05-21.
 * To: More pain, more gain.
 */

import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import { DoubleLeftOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import {connect} from 'dva';
import IntroCom from "@/pages/CourceManagement/components/IntroCom";
import {Row, Col} from 'antd';
import StudentsCom from "@/pages/CourceManagement/components/StudentsCom";
import StudentfCom from "@/pages/CourceManagement/components/StudentfCom";
import styles from '../styles.less'

const UserFeedbackPage = props => {
  const {location,dispatch} = props;
  const {state} = location;

  return (<div style={{padding: 20}}>
    <PageHeaderWrapper pageHeaderRender={e => {
      const data = e.breadcrumb.routes;
      return (<div style={{paddingTop: 20, paddingLeft: 20}}>
        <Link to={"/check"}><DoubleLeftOutlined/>{data[1] ? data[1].breadcrumbName : null}</Link>
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
            <Row>
              <Col span={24}>
                <StudentsCom title={"本课程学生"} data={state}/>
              </Col>
            </Row>
            <Row style={{marginTop:10}}>
              <Col span={24}>
                <StudentfCom title={"举报人"} data={state}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </PageHeaderWrapper>
  </div>)
}
export default connect()(UserFeedbackPage);
