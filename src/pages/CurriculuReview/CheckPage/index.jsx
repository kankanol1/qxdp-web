/**
 * Created by lidianzhong on 2020-05-21.
 * To: More pain, more gain.
 */

import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {DoubleLeftOutlined, LeftOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import {Row, Col, Button, Card, Input} from 'antd';
import styles from '../styles.less'


const UserFeedbackPage = props => {
  const {location} = props;
  const {state} = location;
  return (<div style={{padding:20,overflowX:"hidden"}}>
    <PageHeaderWrapper pageHeaderRender={e => {
      const data = e.breadcrumb.routes;
      return (<div style={{paddingTop: 20, paddingLeft: 20}}>
        <Link to={"/check"}><DoubleLeftOutlined/>{data[1] ? data[1].breadcrumbName : null}</Link>
        <span style={{padding: "0 10px"}}>|</span>
        <span>审核</span>
      </div>)
    }} title={false}>
      <Card className={styles["advice-style"]} style={{paddingTop: 10,  fontSize: 16}}>
        <Row>
          <Col span={10}>
            <img style={{float: 'right', width: 300, height: 350}} alt={"加载中..."} src={state.img}/>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={6} style={{textAlign: "right"}}>课程名称：</Col>
              <Col>{state.title}</Col>
            </Row>
            <Row>
              <Col span={6} style={{textAlign: "right"}}>申请人：</Col>
              <Col>{state.owner}</Col>
            </Row>
            <Row>
              <Col span={6} style={{textAlign: "right"}}>简介：</Col>
              <Col>{state.intro}</Col>
            </Row>
            <Row>
              <Col span={6} style={{textAlign: "right"}}>预售截止日期：</Col>
              <Col>{state.bdeadline}</Col>
            </Row>
            <Row>
              <Col span={6} style={{textAlign: "right"}}>金额：</Col>
              <Col>{state.money}</Col>
            </Row>
            <Row>
              <Col span={6} style={{textAlign: "right"}}>预售金额：</Col>
              <Col>{state.bmoney}</Col>
            </Row>
            <Row>
              <Col span={6} style={{textAlign: "right"}}>单人次佣金：</Col>
              <Col>{state.commission}</Col>
            </Row>
            <Row>
              <Col span={6} style={{textAlign: "right"}}>开课形式：</Col>
              <Col>{state.type}</Col>
            </Row>
            <Row>
              <Col span={6} style={{textAlign: "right"}}>资料链接：</Col>
              <Col><a href={state.src}>资料</a></Col>
            </Row>
            <Row>
              <Col span={6} style={{textAlign: "right"}}>开课老师账号：</Col>
              <Col>{state.connect}</Col>
            </Row>
            <Row>
              <Col span={6} style={{textAlign: "right"}}>紧急联系方式：</Col>
              <Col>{state.tel}</Col>
            </Row>
            <Row>
              <Col span={6} style={{textAlign: "right"}}>付费方式：</Col>
              <Col>{state.way}</Col>
            </Row>
            <Row>
              <Col span={6} style={{textAlign: "right"}}>拒绝审核理由：</Col>
              <Col span={12}>
                <Input.TextArea style={{width: "100%", height: 50}} onChange={e => console.log(e.target.value)}/>
              </Col>
            </Row>
            <Row style={{marginTop: 10}}>
              <Col span={6} style={{textAlign: "right"}}>
                <Button type={"primary"}>拒绝</Button>
              </Col>
              <Col offset={4} span={10} style={{textAlign: "left"}}>
                <Button type={"primary"}>同意</Button>
              </Col>
            </Row>
          </Col>
        </Row>

      </Card>

    </PageHeaderWrapper>
  </div>)
}

export default UserFeedbackPage;
