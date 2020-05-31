/**
 * Created by lidianzhong on 2020-05-21.
 * To: More pain, more gain.
 */

import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {LeftOutlined,DoubleLeftOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import {Row,Col,Button,Card,Input} from 'antd';
import styles from  '../styles.less'


const UserFeedbackPage = props=>{
  const {location} = props;
  const {state} = location;
  return(<div style={{padding:20}}>
    <PageHeaderWrapper pageHeaderRender={e=>{
      const data = e.breadcrumb.routes;
      return (<div style={{paddingTop:20,paddingLeft:20}}>
        <Link to={"/check"}><DoubleLeftOutlined />{data[1]?data[1].breadcrumbName:null}</Link>
        <span style={{padding:"0 10px"}}>|</span>
        <span>课程详情</span>
      </div>)
    }} title={false}>
      <Card className={styles["advice-style"]}>
        <Row>
          <Col span={10} style={{textAlign:"right"}}>课程名称：</Col>
          <Col>{state.title}</Col>
        </Row>
        <Row>
          <Col span={10} style={{textAlign:"right"}}>申请人：</Col>
          <Col>{state.owner}</Col>
        </Row>
        <Row>
          <Col span={10} style={{textAlign:"right"}}>封面：</Col>
          <Col>{state.img}</Col>
        </Row>
        <Row>
          <Col span={10} style={{textAlign:"right"}}>简介：</Col>
          <Col>{state.intro}</Col>
        </Row>
        <Row>
          <Col span={10} style={{textAlign:"right"}}>预售截止日期：</Col>
          <Col>{state.bdeadline}</Col>
        </Row>
        <Row>
          <Col span={10} style={{textAlign:"right"}}>金额：</Col>
          <Col>{state.money}</Col>
        </Row>
        <Row>
          <Col span={10} style={{textAlign:"right"}}>预售金额：</Col>
          <Col>{state.bmoney}</Col>
        </Row>
        <Row>
          <Col span={10} style={{textAlign:"right"}}>单人次佣金：</Col>
          <Col>{state.commission}</Col>
        </Row>
        <Row>
          <Col span={10} style={{textAlign:"right"}}>开课形式：</Col>
          <Col>{state.type}</Col>
        </Row>
        <Row>
          <Col span={10} style={{textAlign:"right"}}>资料链接：</Col>
          <Col>{state.src}</Col>
        </Row>
        <Row>
          <Col span={10} style={{textAlign:"right"}}>开课老师账号：</Col>
          <Col>{state.connect}</Col>
        </Row>
        <Row>
          <Col span={10} style={{textAlign:"right"}}>紧急联系方式：</Col>
          <Col>{state.tel}</Col>
        </Row>
        <Row>
          <Col span={10} style={{textAlign:"right"}}>付费方式：</Col>
          <Col>{state.way}</Col>
        </Row>
        <Row>
          <Col span={10} style={{textAlign:"right"}}>填写拒绝审核理由：</Col>
          <Col>
            <Input.TextArea onChange={e=>console.log(e.target.value)}/>
          </Col>
        </Row>
        <Row style={{marginTop:10}}>
          <Col span={10} style={{textAlign:"right"}}>
            <Button type={"primary"} size={"large"}>关闭课程</Button>
          </Col>
          <Col offset={4} span={10} style={{textAlign:"left"}}>
            <Button type={"primary"} size={"large"} >解散课程</Button>
          </Col>
        </Row>
{/*

"key": i,
      "img": 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      "title":  Mock.mock('@ctitle(3, 8)'),
      "money|100-200": 100,
      "commission|1-50": 20,
      "owner": "张三",
      "deadline": Mock.mock('@now("yyyy-MM-dd mm:hh:ss")'),
      "intro:":Mock.mock('@ctitle(100, 300)'),
      "bdeadline":Mock.mock('@now("yyyy-MM-dd mm:hh:ss")'),
      "bmoney|100-200": 100,
      "type|1":["在线","录制视频","面授"],
      "src":"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      "connect|1":["QQ","微信","手机号码"],
      "tel":"12345678901",
      "way|1":["付费开课","15%提成合作"],
*/}


      </Card>
    </PageHeaderWrapper>
  </div>)
}

export default UserFeedbackPage;
