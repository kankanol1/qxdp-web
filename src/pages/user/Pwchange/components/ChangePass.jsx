/**
 * Created by lidianzhong on 2020-04-13.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import {Form, Input, Button, Checkbox, Tooltip, message} from 'antd';
import {InfoCircleOutlined, LockOutlined, UnlockOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {connect} from 'dva';
import Algorithm from "@/utils/Algorithm";
import RID from "@/utils/rid";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 2 },
};

const icon = {color: 'rgb(24, 144, 255)'};
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
      offset:4
    },
    md: {
      span: 4,
      offset:4
    }
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
    md: {
      span: 8,
    }
  },
};


const ChangePass = props => {
  const {dispatch } = props;
  const [values, setValues] = useState(undefined);
  const [chl, setChl] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [verification, setVerification] = useState(undefined);

  useEffect(()=>{
    if (verification && values && data && chl) {
      const tid = new Date().getTime();
      const param = {
        ...values,
        tid,
        chl: (tid % 1024) << 6,
        pd: Algorithm.decodeRPw(chl, data.rk, values.key, values.pw),
        npd: Algorithm.decodePw(chl, data.rk, values.key, values.pw),
      };
      dispatch({
        type: 'changepw/verification',
        payload: param,
        callback: res => {
          if (res && ((res.status & 0b11) === 0b01)) {
            setVerification(false);
            message.destroy();
            message.info("修改成功")
            /*history.push(
              {
                pathname: '/user/result',
                // state: {account: values.user.email},
              }
            );*/
          }
          setVerification(false);
        }
      }).catch((err) => {
        message.destroy();
        message.info(res.msg||"修改失败，请重试!")
      })
    }
  },[verification])

  const onFinish = values => {
    if (dispatch && values) {
      const params = {
        key:Algorithm.keyCreate(8),
        rid: RID,
        ful:location.href,
        un: localStorage.getItem('username'),//测试需修改
        pw:values.password,
      };
      setValues(params);
      const tid = new Date().getTime();
      const chl = (tid % 1024) << 6;
      setChl(chl);
      const props = {
        ...params,
        did: Algorithm.stringToHex(params.key).join('').split('').reverse().join(''),
        tid,
        chl,
      };
      dispatch({
        type: 'changepw/start',
        payload: props,
        callback: res => {
          if ((res.status & 0b11) === 0b01 && res.data) {
            setData(res.data);
            setVerification(true);
          } else {
            message.destroy();
            message.info(res.msg||'修改失败，请重试！');
          }
        }
      })
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...formItemLayout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

      <Form.Item
        label="旧密码："
        name="oldpw"
        rules={[{ required: true, message: '请输入旧密码!' }]}
      >
        <Input.Password prefix={<LockOutlined style={icon} />} allowClear/>
      </Form.Item>
      <Form.Item
        name="password"
        label="新密码："
        {...formItemLayout}
        rules={[
          {required: true, message: '不低于6位；数字、字母和下划线；包含数字和字母！',
            pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,245}$/},]
        }
      >
        <Input.Password prefix={<LockOutlined style={icon}/>} suffix={
          <Tooltip title="密码长度不可低于6位,且包含数字和字母！">
            <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
          </Tooltip>
        }
        />
      </Form.Item>
      <Form.Item
        name='confirm'
        label="确认："
        dependencies={['password']}
        hasFeedback
        {...formItemLayout}
        rules={[
          {
            required: true,
            message: '请确认密码!',
          },
          ({getFieldValue}) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              // eslint-disable-next-line prefer-promise-reject-errors
              return Promise.reject('密码不一致!');
            },
          }),
        ]}
      >
        <Input.Password placeholder="请确认密码" prefix={<UnlockOutlined style={icon}/>} allowClear/>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          修改
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect()(ChangePass);
