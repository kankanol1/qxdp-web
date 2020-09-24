/**
 * Created by lidianzhong on 2020-06-22.
 * To: More pain, more gain.
 */

import React,{useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import { DoubleLeftOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import {connect} from 'dva';
import IntroCom from "./components/IntroCom";
import {Row, Col, Tabs, Button, Popover} from 'antd';
import StudentsCom from "./components/StudentsCom";
import StudentfCom from "./components/StudentfCom";
import styles from './styles.less'
import request from '@/utils/request';
import ExportJsonExcel from "js-export-excel";
const { TabPane } = Tabs;

const columns = [
  {
    title: '头像',
    dataIndex: 'img',
    key: 'img',
    render: (text, row) => {
      return (
        <div style={{width: 50, margin: '0 auto'}}>
          <Popover placement="right" style={{border: '1px solid #eee'}} content={() => (
            <div style={{width: 100, margin: '0 auto',}}><img style={{width: 100, height: 100,borderRadius:"50%"}} alt="example"
                                                              src={text}/></div>)} title="头像">
            <img style={{width: 30, height: 30,borderRadius:"50%"}} alt="example" src={text}/>
          </Popover>
        </div>
      )
    }
  },
  {
    title: '昵称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '审核数量',
    dataIndex: 'checks',
    key: 'checks',
  },
  {
    title: '手机号',
    dataIndex: 'tel',
    key: 'tel',
  },
];
const UserFeedbackPage = props => {
  const {location,dispatch} = props;
  const {state} = location;
  const [type,setType] = useState("manager");

  const exportExcel = () => {
    request('/api/person/'+type,{
      method:"POST",
      params: {page:1, size:200,role:type},
    }).then(res=>{
      if(res.status==="ok"){
        const option = {};
        option.fileName = type;
        option.datas = [
          {
            sheetData:res.dataSource,
            sheetName: 'sheet',
            sheetFilter: columns.map(i=>{return i.dataIndex}),
            sheetHeader: columns.map(i=>{return i.title}),
          },
        ];
        console.log(option);
        const toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
      }
    }).catch(err=>{err;})
  }

  const operations=(<Button type={"primary"} onClick={()=>exportExcel()}>导出</Button>)
  return (<div style={{padding:20,overflowX:"hidden"}}>
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
          <Col span={12} style={{padding:10}}>
            <Tabs defaultActiveKey="1" onChange={e=>setType(e)} tabBarExtraContent={operations}>
              <TabPane tab="管理员" key="manager">
                <StudentsCom type={"manager"}/>
              </TabPane>
              <TabPane tab="审核员" key="checker">
                <StudentfCom type={"checker"} />
              </TabPane>
            </Tabs>
          </Col>
          <Col span={12} style={{padding:10}}>
            <IntroCom state={state}/>
          </Col>
        </Row>
      </div>
    </PageHeaderWrapper>
  </div>)
}
export default connect()(UserFeedbackPage);
