/**
 * Created by lidianzhong on 2020-05-21.
 * To: More pain, more gain.
 */

import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {LeftOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import {Row,Col} from 'antd';
import Mock from "mockjs";
import styles from  '../styles.less'


const UserFeedbackPage = props=>{

  const {location} = props;
  const {state} = location;
  const data=state;
  const dataSource =Array(100)
    .fill(0, 0, 100)
    .map((item, i) => {
      return Mock.mock({
          "key": i,
          "img": 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          "title":  Mock.mock('@ctitle(3, 8)'),
          "money|100-200": 100,
          "commission|1-50": 20,
          "owner": "张三",
          "deadline": Mock.mock('@now("yyyy-MM-dd mm:hh:ss")'),
          "context":  Mock.mock('@ctitle(100, 200)'),
        }
      )
    });
  return(<div style={{padding:20}}>
    <PageHeaderWrapper pageHeaderRender={e=>{
      const data = e.breadcrumb.routes;
      return (<div style={{paddingTop:20,paddingLeft:20}}>
        <Link to={"/check"}><LeftOutlined />{data[1]?data[1].breadcrumbName:null}</Link>
        <span style={{padding:"0 10px"}}>|</span>
        <span>审核</span>
      </div>)
    }} title={false}>
      <div className={styles["advice-style"]}>
        <Row><Col span={6} style={{textAlign:"right"}}>课程名称：</Col><Col>{data.title}</Col></Row>
        <Row><Col>课程名称：</Col><Col>{data.title}</Col></Row>
        <Row><Col>课程名称：</Col><Col>{data.title}</Col></Row>
        <Row><Col>课程名称：</Col><Col>{data.title}</Col></Row>
        <Row><Col>课程名称：</Col><Col>{data.title}</Col></Row>
        <Row><Col>课程名称：</Col><Col>{data.title}</Col></Row>
        <Row><Col>课程名称：</Col><Col>{data.title}</Col></Row>
        <Row><Col>课程名称：</Col><Col>{data.title}</Col></Row>
        <Row><Col>课程名称：</Col><Col>{data.title}</Col></Row>
        <Row><Col>课程名称：</Col><Col>{data.title}</Col></Row>
        <Row><Col>课程名称：</Col><Col>{data.title}</Col></Row>

      </div>
    </PageHeaderWrapper>
  </div>)
}

export default UserFeedbackPage;
