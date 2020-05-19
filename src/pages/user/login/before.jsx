/**
 * Created by lidianzhong on 2020-05-18.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React from 'react';
import {Row,Col} from 'antd'

const BeforePage =props=>{

  return (<div className="qxd-box">
    <Row>
      <Col offset={20} span={2}>
        <Link to={{pathname:'/qxd/user/login'}}>登录</Link>
      </Col>
      <Col span={2}>
        <Link to={{pathname:'/qxd/user/register'}}>注册</Link>
      </Col>
    </Row>
  </div>)
}

export default BeforePage;
