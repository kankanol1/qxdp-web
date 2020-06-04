/**
 * Created by lidianzhong on 2020-05-21.
 * To: More pain, more gain.
 */

import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {LeftOutlined, DoubleLeftOutlined, EyeOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import {connect} from 'dva';
import IntroCom from "@/pages/CourceManagement/components/IntroCom";
import {Row, Col, Table, Card, Input, Tooltip, Popover, Pagination} from 'antd';
import styles from '../styles.less'
import Mock from "mockjs";

const student1 = [
  {
    title: '头像',
    dataIndex: 'img',
    key: 'img',
    render: (text, row) => {
      return (
        <div style={{width: 50, margin: '0 auto'}}>
          <Popover placement="right" style={{border: '1px solid #eee'}} content={() => (
            <div style={{width: 100, margin: '0 auto'}}><img style={{width: 100, height: 100}} alt="example"
                                                             src={text}/></div>)} title="课程封面">
            <img style={{width: 50, height: 30}} alt="example" src={text}/>
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
    title: '手机号',
    dataIndex: 'tel',
    key: 'tel',
  },
];
const student2= [
  {
    title: '头像',
    dataIndex: 'img',
    key: 'img',
    render: (text, row) => {
      return (
        <div style={{width: 50, margin: '0 auto'}}>
          <Popover placement="right" style={{border: '1px solid #eee'}} content={() => (
            <div style={{width: 100, margin: '0 auto'}}><img style={{width: 100, height: 100}} alt="example"
                                                             src={text}/></div>)} title="课程封面">
            <img style={{width: 50, height: 30}} alt="example" src={text}/>
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
    title: '手机号',
    dataIndex: 'tel',
    key: 'tel',
  },
];

const dataSource1=[
  {"img": 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',"title":  Mock.mock('@ctitle(3, 8)'),tel:"12345678901"},
  {"img": 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',"title":  Mock.mock('@ctitle(3, 8)'),tel:"12345678901"},
  {"img": 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',"title":  Mock.mock('@ctitle(3, 8)'),tel:"12345678901"},
  {"img": 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',"title":  Mock.mock('@ctitle(3, 8)'),tel:"12345678901"},
];

const dataSource2=[
  {"img": 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',"title":  Mock.mock('@ctitle(3, 8)'),tel:"12345678901"},
  {"img": 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',"title":  Mock.mock('@ctitle(3, 8)'),tel:"12345678901"},
  {"img": 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',"title":  Mock.mock('@ctitle(3, 8)'),tel:"12345678901"},
  {"img": 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',"title":  Mock.mock('@ctitle(3, 8)'),tel:"12345678901"},
];
const UserFeedbackPage = props => {
  const {location,dispatch} = props;
  const {state} = location;

  const queryFun = (page, size) => {
    dispatch({
      type: 'students/query',
      payload: {page, size}
    })
  }

  return (<div style={{padding: 20}}>
    <PageHeaderWrapper pageHeaderRender={e => {
      const data = e.breadcrumb.routes;
      return (<div style={{paddingTop: 20, paddingLeft: 20}}>
        <Link to={"/check"}><DoubleLeftOutlined/>{data[1] ? data[1].breadcrumbName : null}</Link>
        <span style={{padding: "0 10px"}}>|</span>
        <span>课程详情</span>
      </div>)
    }} title={false}>
      <Card className={styles["advice-style"]}>
        <Row>
          <Col span={12}>
            <IntroCom state={state}/>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={24}>
                {/*<div style={{border: '1px solid #eee'}}>*/}
                <div>
                  <Table
                    style={{textAlign: 'center'}}
                    columns={student1}
                    dataSource={dataSource1}
                    size={"small"}
                    bordered={false}
                    pagination={false}
                    scroll={{y: 340}}
                  />
                </div>

                {/*<div style={{height: 50, width: '100%', padding: 10, backgroundColor: '#fafafa', border: '1px solid #eee'}}>*/}
                <div>
                  <Pagination
                    style={{float: 'right'}}
                    onChange={(page, pageSize) => {
                      queryFun(page, pageSize);
                    }}
                    onShowSizeChange={(current, size) => {
                      queryFun(current, size);
                    }}
                    size="large"
                    total={200}
                    showSizeChanger
                    showQuickJumper/>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Table
                  columns={student2}
                  dataSource={dataSource2}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  </div>)
}

export default connect()(UserFeedbackPage);
