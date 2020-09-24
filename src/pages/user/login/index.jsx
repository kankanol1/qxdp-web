import {Form, message, Select, Space, Row, Col, Input, Button, Checkbox, Tooltip} from 'antd';
import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'dva';
import styles from './style.less';
import Algorithm from "@/utils/Algorithm";
import RID from "@/utils/rid";
import {InfoCircleOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "umi";
import Cookie from "@/utils/cookies";
import clientType from '@/utils/clientType';
import allKey from "@/utils/key";
import request from "@/utils/request";
import { router } from 'umi';
const layout = {
  labelCol:{
    span:3,
  },
  wrapperCol: {
    span: 21,
  },
};
const tailLayout = {
  wrapperCol: {
    span: 21,
    offset:3,
  },
};
const icon = {color: 'rgb(24, 144, 255)'};
const {Option} = Select;
const Login = props => {
  const {submitting, dispatch} = props;
  const [autoLogin, setAutoLogin] = useState(true);

  const [form] = Form.useForm();

  const handleOk = values => {
    // values.password = Algorithm.encryptQXD(values.password, values.password);
    request("/qxdpc/api/pc/user/login", {
      method: 'POST',
      params: values,
    }).then(res => {
      // console.log(res);
      if (res.status === '200') {
        const role =['user','admin']
        res.currentAuthority=[role[res.role]];
        dispatch({
          type: 'login/logins',
          response: res,
        })
      } else {
        message.warning("登录失败，请核实账号和密码重新登录！")
      }
    })
    /* values.tp = clientType.client();
     values.remember = autoLogin;
     console.log(values);
     setValues(values);
     const key = Algorithm.keyCreate(8);
     setKey(key);
     const tid = new Date().getTime();
     const chl = (tid % 1024) << 6;
     setChl(chl);
     const params = {
       did: Algorithm.stringToHex(key).join('').split('').reverse().join(''),
       tp: values.tp,
       chl: (tid % 1024) << 6,
       tid,
       un: values.userName,
       rid: RID,
       ful: location.href,
     };
     dispatch({
       type: 'login/loginsu',
       payload: params,
       callback: res => {
         if (res && ((res.status & 0b11) === 0b01)) {
           setData(res.data);
           setSubmit(true);
         } else {
           message.destroy();
           message.info(res.msg || '登录失败，请重试！');
           setSubmit(false);
         }
       }
     });*/
  };

  const onFinishFailed = errorInfo => {
    message.destroy();
    message.info("登录失败，请重试！");
  };
  return (
    <div className={styles.main}>
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{
          userName: Cookie.getCookie('un') || '',
          password: Cookie.getCookie('pw') ? Algorithm.RSADe(Cookie.getCookie('pw'), allKey.priK) : '',
        }}
        onFinish={handleOk}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="name" label="账号" rules={[{required: true, message: '账号不可为空！'}]}>
          <Input prefix={<UserOutlined style={icon}/>} placeholder="gl2020"
                 suffix={<Tooltip title="请填写正确账号"><InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/></Tooltip>}/>
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{required: true, message: '密码不可为空！'}]}>
          <Input.Password prefix={<LockOutlined style={icon}/>} placeholder="gl2020"/>
        </Form.Item>
       {/* <Form.Item name="role" label="角色" rules={[{required: true, message: '角色不可为空！'}]}>
          <Select>
            <Option key={"管理员"} value={"管理员"}>管理员</Option>
            <Option key={"普通用户"} value={"普通用户"}>普通用户</Option>
          </Select>
        </Form.Item>*/}
        <div style={{marginBottom: 20,paddingLeft:60}}>
          <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>自动登录</Checkbox>
          {/*<a onClick={() => {
            message.destroy;
            message.info('请联系系统管理员！')
          }} style={{float: 'right',}}>
            忘记密码
          </a>*/}
         {/* <Col span={8}>
            <Button type="primary" onClick={() => router.push("/user/register")}>
              注册
            </Button>
          </Col>*/}
          <a onClick={() => router.push("/user/register")} style={{float: 'right',}}>
            还没账号？前去注册
          </a>
        </div>
        <Form.Item {...tailLayout}>
          <Button loading={submitting} style={{width: '100%'}} type="primary" htmlType="submit">
            登录
          </Button>
         {/* <Row style={{textAlign:'center'}}>
            <Col >
              <Button loading={submitting} type="primary" htmlType="submit">
                登录
              </Button>
            </Col>

          </Row>*/}

        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(({login, loading}) => ({
  userLogin: login,
  submitting: loading.effects['login/loginnm'],
}))(Login);
