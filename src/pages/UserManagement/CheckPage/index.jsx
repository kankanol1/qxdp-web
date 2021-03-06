/**
 * Created by lidianzhong on 2020-05-21.
 * To: More pain, more gain.
 */

import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import { DoubleLeftOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import {connect} from 'dva';
import IntroCom from "../components/IntroCom";
import {Row, Col,Tabs,Button} from 'antd';
import StudentsCom from "../components/StudentsCom";
import StudentfCom from "../components/StudentfCom";
import styles from '../styles.less'
import ExportJsonExcel from "js-export-excel";
const { TabPane } = Tabs;

const UserFeedbackPage = props => {
  const {location,dispatch} = props;
  const {state} = location;
  const exportExcel = (props) => {
    console.log(props);
    try {
      dispatch({
        type: 'students/courcesa',
        payload: {page:1, size:200} ,
        callback:res=>{
          if(res.status==="ok"){
            const option = {};
            option.fileName = 'course';
            option.datas = [
              {
                sheetData: res.dataSource,
                sheetName: 'sheet',
                sheetFilter: Object.entries(name).map(i=>{return i[0]}),
                sheetHeader: Object.entries(name).map(i=>{return i[1]}),
              },
            ];
            const toExcel = new ExportJsonExcel(option);
            toExcel.saveExcel();
          }
        }
      })
    }catch (e) {
      console.error(e);
    }
  }
  return (<div style={{padding:20,overflowX:"hidden"}}>
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
            <Tabs
              defaultActiveKey="1"
              tabBarExtraContent={<Button type={"primary"} onClick={()=>exportExcel(state)}>导出</Button>}
            >
              <TabPane tab="佣金收入" key="1">
                <StudentsCom data={state}/>
              </TabPane>
              <TabPane tab="开课收入" key="2">
                <StudentfCom data={state}/>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </PageHeaderWrapper>
  </div>)
}
export default connect()(UserFeedbackPage);
