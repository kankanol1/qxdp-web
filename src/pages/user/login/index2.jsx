import { Row, Col} from 'antd';
import React from 'react';
import {Link} from "umi";
import styles from "@/layouts/UserLayout.less";
import logo from "@/assets/logo.svg";

const LoginBefore = props => {
  return (<div className="qxd-box">
    <div style={{height: "266px"}}>
      <Row>
        <Col span={4}>
          <div style={{paddingLeft:'30px'}}>
            <img alt="logo" className={styles.logo} src={logo}/>
            <span className={styles.title}>趣学岛</span>
          </div>
        </Col>
        <Col offset={16} span={2}>
          <Link style={{lineHeight:"50px"}} to={{pathname:'/qxd/user/logins'}}>登录</Link>
        </Col>
        <Col span={2}>
          <Link style={{lineHeight:"50px"}} to={{pathname:'/qxd/user/register'}}>注册</Link>
        </Col>
      </Row>
    </div>
    <div style={{height:"216px",textAlign:"center",fontSize:"24px"}}>
      <Row>
        <Col span={24}>
          社群优势、专为社群打造的平台工具
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          知识付费已成为广大用户所接受和喜欢的新的学习方式
        </Col>
      </Row>
    </div>
    <div style={{height:"266px",textAlign:"center",fontSize:"24px"}}>
      <Row>
        <Col span={24}>
            开课方便，最低零费用。
        </Col>
      </Row>
      <Row>
        <Col span={24}>
            工具受众广泛，推广方便
        </Col>
      </Row>
    </div>
    <div style={{height:"570px",textAlign:"center",fontSize:"24px"}}>
      <Row>
        <Col span={24}>丰富而易懂社群内容，总有一款触动你</Col>
      </Row>
      <Row>
        <Col span={24}>分享课程就能赚钱，还在等什么</Col>
      </Row>
    </div>
  </div>)
};

export default LoginBefore;
