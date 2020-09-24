import React, {useState, useEffect} from 'react';
import {Link} from 'umi';
import {connect} from 'dva';
import {withRouter} from 'react-router-dom';
import Algorithm from '../../../utils/Algorithm';
import CryptoJS from 'crypto-js';
import {
  message,
  Form,
  Input,
  Tooltip,
  Button,
  AutoComplete, Select,
} from 'antd';
import {
  MobileOutlined,
  InfoCircleOutlined,
  MailOutlined,
  UnlockOutlined,
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';
import request from "@/utils/request";
import router from "umi/router";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
    md: {
      span: 4,
    }
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 18,
    },
    md: {
      span: 18,
    }
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 18,
      offset: 4,
    },
  },
};
const icon = {color: 'rgb(24, 144, 255)'};
const userlist = {
  user: {
    name: 'gl2020',
    password: 'gl2020',
    role:'管理员',

  }
};


function encryptQXD (message, key) {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  /*return {
    key: keyHex,
    value: encrypted.toString()
  }*/
  return encrypted.toString();
}

function decrypt (message, key) {
  var plaintext = CryptoJS.DES.decrypt(message, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return plaintext.toString(CryptoJS.enc.Utf8)
}
/*
*
* var a = encrypt('mssage123', '123');
var b = decrypt(a.value, a.key);
* */
const RegistrationForm = (props) => {
  const {userAndUserRegister, submitting, dispatch,history} = props;
  const [form] = Form.useForm();
  const {emailList}=userAndUserRegister;

  const onFinish = values => {
    delete values.confirm;
    message.destroy();
    // values.password=Algorithm.encryptQXD(values.password, values.password);
    values.role=1;
    request("/qxdpc/api/pc/user/create",{
      method:'POST',
      data:values,
    }).then(res=>{
      if(res.status==='200'){
        if(res.data){
          message.info({content:"注册成功，即将前往登录页！",onClose:()=>{
              router.push("/user/login");
            }});
        }else{
          message.info("服务器异常，请联系管理员！");
        }

      }else{
        message.info(res.msg);
      }
    })
  };
  const onReset = () => {
    form.resetFields();
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onEmailChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(emailList.map(domain => `${value.split("@")[0]}${domain}`));
    }
  };
  const emailOptions = autoCompleteResult.map(email => ({
    label: email,
    value: email,
  }));
  return (
    <div style={{width: "40%", margin: "0 auto"}}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={userlist}
        scrollToFirstError
      >
        <Form.Item
          {...formItemLayout}
          name={["name"]}
          label="账号："
     /*     rules={[{
            required: true,
            message: '数字、英文字母或者下划线组成的字符！',
            pattern:/^\w{6,18}$/
          },]}*/
        >
          <Input allowClear prefix={<UserOutlined style={icon}/>}/>
        </Form.Item>
{/*        <Form.Item
          name={["role"]}
          label="角色"
          rules={[{required: true,},]}
        >
          <Input
            allowClear
            style={{width: '100%',}}
          />
          <Select>
            <Option key="1" value="1">管理员</Option>
            <Option key="2" value="2">普通用户</Option>
          </Select>
        </Form.Item>*/}
        <Form.Item
          name={["password"]}
          label="密码："
          {...formItemLayout}
          rules={[
            {
              required: true,
              message: '密码长度不可低于6位，且包含数字和字母！',
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
          name={['confirm']}
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
                if (!value || getFieldValue(['password']) === value) {
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

        <Form.Item {...tailFormItemLayout} style={{marginBottom: 0, marginTop: '-16px'}}>
          <Link style={{float: 'right'}} to='/user/login'>
            已有账户返回登录
          </Link>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button loading={submitting} style={{width: '100%'}} type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(connect(({userAndUserRegister, loading}) => ({
  userAndUserRegister,
  submitting: loading.effects['userAndUserRegister/submit'],
}))(RegistrationForm));
