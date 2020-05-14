import {Form, message, Input, Button, Checkbox, Tooltip} from 'antd';
import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'dva';
import styles from './style.less';
import Algorithm from "@/utils/Algorithm";
import RID from "@/utils/rid";
import {InfoCircleOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "umi";
import Cookie from "@/utils/cookies";
import clientType from '@/utils/clientType';
import allKey from "@/utils/key";

const layout = {
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    span: 24,
  },
};
const icon = {color: 'rgb(24, 144, 255)'};

const Login = props => {
  const {submitting, dispatch} = props;
  const [autoLogin, setAutoLogin] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [values, setValues] = useState(undefined);
  const [key, setKey] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [chl, setChl] = useState(undefined);

  const [form] = Form.useForm();

  useEffect(() => {
    if (data && submit && values && chl && key) {
      const tid = new Date().getTime();
      const params = {
        "chl": (tid % 1024) << 6,
        "ful": location.href,
        "pd": Algorithm.decodePw(chl, data.rk, key, values.password),
        "rid": RID,
        "password": values.password,
        "remember": values.remember,
        tid,
        tp: values.tp,
        "un": values.userName,
      };
      dispatch({
        type: 'login/loginnm',
        payload: params,
        callback: res => {
          console.log(res);
        },
      });
      setSubmit(false);
    }
  }, [submit]);

  const handleOk = values => {
    values.tp = clientType.client();
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
    });
  };

  const onFinishFailed = errorInfo => {
    message.destroy();
    message.info("登录失败，请重试！");
  };

  return (
    <div className={styles.main}>
      <h3 style={{textAlign: 'center', color: '#0189ff'}}>账户密码登录</h3>
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
        <Form.Item name="userName" rules={[{required: true, message: '密码不可为空！'}]}>
          <Input  prefix={<UserOutlined style={icon}/>} placeholder="example@gl-data" size="large" suffix={<Tooltip title="必须以公司二级域名为后缀！"><InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/></Tooltip>}/>
        </Form.Item>
        <Form.Item name="password" rules={[{required: true, message: '密码不可为空！'}]}>
          <Input.Password size="large"/>
        </Form.Item>
        <div style={{marginBottom: 20}}>
          <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>自动登录</Checkbox>
          <a onClick={() => {message.destroy;message.info('请联系公司管理员！')}} style={{float: 'right',}}>
            忘记密码
          </a>
        </div>
        <Form.Item {...tailLayout}>
          <Button loading={submitting} style={{width: '100%'}} size="large" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
        <div className={styles.other}>
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default connect(({login, loading}) => ({
  userLogin: login,
  submitting: loading.effects['login/loginnm'],
}))(Login);
