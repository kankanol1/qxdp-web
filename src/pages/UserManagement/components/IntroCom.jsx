/**
 * Created by lidianzhong on 2020-06-04.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React from 'react';
import {Row, Radio, Col} from 'antd';

const IntroCom = props => {
  const {state} = props;
  return (<div style={{padding: 100}}>
    <Row>
      <Col span={24}>
        <Row>
          <Col span={6}>

            <img src={state.img} style={{width:100,height:100,borderRadius:'50%'}} alt=""/>
          </Col>
          <Col span={12} style={{paddingTop:22}}>
            <Row>
              <Col span={8} style={{textAlign:"right"}}>昵称：</Col>
              <Col>{state.title}</Col>
            </Row>
            <Row>
              <Col span={8} style={{textAlign:"right"}}>总收入：</Col>
              <Col>{state.total}</Col>
            </Row>
            <Row>
              <Col span={8} style={{textAlign:"right"}}>个性签名：</Col>
              <Col>{state.world}</Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row style={{marginTop:30}}>
      <Col span={24}>
        <Radio value={1}>禁止开课</Radio>
      </Col>
    </Row><Row>
    <Col span={24}>
      <Radio value={2}>禁止提现</Radio>
    </Col>
  </Row>
  </div>)
}
export default IntroCom;
