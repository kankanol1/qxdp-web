/**
 * Created by lidianzhong on 2020-06-03.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React from 'react';

import {Button, Col, Popover, Row, Table, Tooltip} from 'antd';

const IntroCom = props => {
  const {state} = props;
  return (<div style={{padding:20,fontSize:16}}>
    <Row>
      <Col span={8} style={{textAlign: "right"}}>课程名称：</Col>
      <Col span={16}>{state.title}</Col>
    </Row>
    <Row>
      <Col span={8} style={{textAlign: "right"}}>申请人：</Col>
      <Col>{state.owner}</Col>
    </Row>
    <Row>
      <Col span={8} style={{textAlign: "right"}}>封面：</Col>
      <Col>
        <Popover
          placement="right"
          style={{border: '1px solid #eee'}}
          content={() => (<div style={{width: 200, margin: '0 auto'}}>
            <img style={{width: 200, height: 300}} alt="example" src={state.img}/>
          </div>)}
          title="课程封面"
        >
          <img style={{width: 30, height: 20}} alt="example" src={state.img}/>
        </Popover>
      </Col>
    </Row>
    <Row>
      <Col span={8} style={{textAlign: "right"}}>简介：</Col>
      <Col>
        <Tooltip title={state.intro}>
          <a style={{
            width: 200,
            display: "inline-block",
            overflow: "hidden",
            textOverflow: 'ellipsis',
            whiteSpace: "nowrap"
          }}>
            {state.intro}
          </a>
        </Tooltip>
      </Col>
    </Row>
    <Row>
      <Col span={8} style={{textAlign: "right"}}>预售截止日期：</Col>
      <Col>{state.bdate}</Col>
    </Row>
    <Row>
      <Col span={8} style={{textAlign: "right"}}>金额：</Col>
      <Col>{state.money}</Col>
    </Row>
    <Row>
      <Col span={8} style={{textAlign: "right"}}>预售金额：</Col>
      <Col>{state.bmoney}</Col>
    </Row>
    <Row>
      <Col span={8} style={{textAlign: "right"}}>单人次佣金：</Col>
      <Col>{state.commission}</Col>
    </Row>
    <Row>
      <Col span={8} style={{textAlign: "right"}}>开课形式：</Col>
      <Col>{state.type}</Col>
    </Row>
    <Row>
      <Col span={8} style={{textAlign: "right"}}>资料链接：</Col>
      <Col><a href={state.src} target="_blank">资料</a></Col>
    </Row>
    <Row>
      <Col span={8} style={{textAlign: "right"}}>开课老师账号：</Col>
      <Col>{state.connect}</Col>
    </Row>
    <Row>
      <Col span={8} style={{textAlign: "right"}}>紧急联系方式：</Col>
      <Col>{state.tel}</Col>
    </Row>
    <Row>
      <Col span={8} style={{textAlign: "right"}}>付费方式：</Col>
      <Col>{state.way}</Col>
    </Row>
    <Row>
      <Col span={8} style={{textAlign: "right"}}>审核人：</Col>
      <Col>{state.check}</Col>
    </Row>
    <Row style={{marginTop: 10}}>
      <Col span={10} style={{textAlign: "right"}}>
        <Button type={"primary"}>关闭课程</Button>
      </Col>
      <Col offset={4} span={10} style={{textAlign: "left"}}>
        <Button type={"primary"}>解散课程</Button>
      </Col>
    </Row>

  </div>)
}
export default IntroCom;
