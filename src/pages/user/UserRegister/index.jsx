import React, {useState, useEffect} from 'react';
import {Link} from 'umi';
import {connect} from 'dva';
import {withRouter} from 'react-router-dom';
import Algorithm from '../../../utils/Algorithm';
import RID from '../../../utils/rid';

import {
  message,
  Form,
  Input,
  Tooltip,
  Button,
  AutoComplete,
} from 'antd';
import {
  MobileOutlined,
  InfoCircleOutlined,
  MailOutlined,
  UnlockOutlined,
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';


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
    username: 'gl2020',
    email: 'email@qq.com',
    tel: '0531-3456784',
    password: 'gl2020',
    confirm: 'gl2020',
    invitationCode: 'gl2020',
  }
};


const RegistrationForm = (props) => {
  const {dispatch,userAndUserRegister, submitting, history} = props;
  const [values, setValues] = useState(undefined);
  const [key, setKey] = useState(undefined);
  const [chl, setChl] = useState(undefined);
  const [form] = Form.useForm();
  const [data, setData] = useState(undefined);
  const [verification, setVerification] = useState(false);
  const {emailList}=userAndUserRegister;

  useEffect(() => {
    if (verification && values && data && chl && key) {
      const tid = new Date().getTime();
      const param = {
        "chl": (tid % 1024) << 6,
        "ful": location.href,
        "ic": values.ic,
        "pd": Algorithm.decodePw(chl, data.rk, key, values.pd),
        "rid": RID,
        tid,
        "un": values.un,
        "tel": values.tel,
        "email": values.email,
      };
      dispatch({
        type: 'userAndUserRegister/submit',
        payload: param,
        callback: res => {
          if (res && ((res.status & 0b11) === 0b01)) {
            setVerification(false);
            history.push(
              {
                pathname: '/user/result',
                // state: {account: values.user.email},
              }
            );
          }
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [verification]);

  const onFinish = values => {
    if (dispatch && values) {
      const params = {
        un: values.user.username,
        em: values.user.email,
        email: values.user.email,
        tel: values.user.tel,
        pd: values.user.password,
        ic: Algorithm.stringToHex(values.user.invitationCode).join('').split('').reverse().join(''),
      };
      setValues(params);
      const key = Algorithm.keyCreate(8);
      setKey(key);
      const tid = new Date().getTime();
      const chl = (tid % 1024) << 6;
      setChl(chl);
      const props = {
        chl,
        did: Algorithm.stringToHex(key).join('').split('').reverse().join(''),
        ful: location.href,
        rid: RID,
        tid,
        un: params.un,
        ic: params.ic,
      };
      dispatch({
        type: 'userAndUserRegister/verification',
        payload: props,
        callback: res => {
          if ((res.status & 0b11) === 0b01 && res.data.ued) {
            setData(res.data);
            setVerification(true);
          } else {
            message.destroy();
            message.warning(res.msg);
          }
        }
      })
    }
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
          name={["user", "username"]}
          label="账号："
          rules={[{
            required: true,
            message: '数字、英文字母或者下划线组成的字符！',
            pattern:/^\w{6,18}$/
          },]}
        >
          <Input allowClear prefix={<UserOutlined style={icon}/>}/>
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="邮箱："
          rules={[
            {
              type: 'email',
              message: '邮箱格式不正确!',
            },
            {
              required: true,
              message: '请输入邮箱!',
            },
          ]}
        >
          <AutoComplete
            options={emailOptions}
            onChange={onEmailChange}
          >
            <Input prefix={<MailOutlined style={icon}/>} allowClear suffix={
              <Tooltip title="邮箱也可以手动填写">
                <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
              </Tooltip>
            }/>
          </AutoComplete>
        </Form.Item>
        <Form.Item
          name={["user", "tel"]}
          label="电话："
          rules={[
            {
              required: true, message: '请输正确的联系方式!',
              pattern:/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
            },
          ]}
        >
          <Input
            prefix={<MobileOutlined style={icon}/>}
            allowClear
            style={{width: '100%',}}
          />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="密码："
          {...formItemLayout}
          rules={[
            {required: true, message: '密码长度不可低于6位，且包含数字和字母！',
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
          name={[['user', 'confirm']]}
          label="确认："
          dependencies={['user', 'password']}
          hasFeedback
          {...formItemLayout}
          rules={[
            {
              required: true,
              message: '请确认密码!',
            },
            ({getFieldValue}) => ({
              validator(rule, value) {
                if (!value || getFieldValue(['user', 'password']) === value) {
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
        <Form.Item
          {...formItemLayout}
          name={["user", "invitationCode"]}
          label="邀请码："
          rules={[{required: true, message: '邀请码!',},]}
        >
          <Input
            prefix={<MobileOutlined style={icon}/>}
            allowClear
            style={{width: '100%',}}
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout} style={{marginBottom: 0, marginTop: '-16px'}}>
          <a onClick={onReset}>
            清空
          </a>
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
