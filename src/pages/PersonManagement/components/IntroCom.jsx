/**
 * Created by lidianzhong on 2020-06-04.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React, {useRef, useState} from 'react';
import {Row, Radio, Col, Checkbox, Button, Upload, Form, Input, message} from 'antd';
import courseStyles from "@/pages/CurriculuReview/CheckPage/madal.less";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import AvatarCom from "./AvatarCom";
import request from "@/utils/request";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 10},
};


const IntroCom = props => {
  const {state} = props;
  const [courses] = Form.useForm();
  const [value, setValue] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(undefined);

  const changeFile = file => {
    setFile(file);
    courses.setFieldsValue({avatar: file});
  }
  const handleOk = () => {
    courses.validateFields().then(values => {
      if (!values.hasOwnProperty("outOfDate")) {
        request('/api/check/query', {
          method: "POST",
          params: values,
        }).then(res => {
          if (res.status === 'ok') {
            message.destroy();
            message.success("成功！")
          }
        })
      }
    }).catch(err => {
      console.log(err);
    });

    handleUpload(file);
  }
  const onClickAdd = () => {
    courses.validateFields().then(value => {
      console.log(value);
    }).catch(err => {
      console.log(err);
    })
  }
  const RadioonChange = props => {
    setValue(props);
  }

  const handleUpload = async (file) => {
    message.destroy();
    file && request(`/api/sys/img/avatar`, {
      method: 'POST',
      data: file,
    }).then(res => {
      message.success("上传成功");
    }).catch(err => {
      message.error('上传失败.');
    })
  }


  return (<div style={{border:'1px solid #eee'}}>
    <Form {...layout} form={courses} onFinish={() => handleOk()}>
      <div className={courseStyles["base-info"]}>
        <Row>
          <Col span={24}>
            <Form.Item
              label="账号"
              name={["username"]}
              rules={[{required: true,},]}
            >
              <Input className={courseStyles["goods-input"]}/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="密码"
              name={["password"]}
              rules={[{required: true,},]}
            >
              <Input className={courseStyles["goods-input"]}/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="昵称"
              name={["nickname"]}
              rules={[{required: true,},]}
            >
              <Input className={courseStyles["goods-input"]}/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="头像"
              name={["avatar"]}
              rules={[{required: true,},]}
            >
              <Input className={courseStyles["goods-input"]} hidden={true}/>
              <AvatarCom changeFile={changeFile}/>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="角色"
              name={["role"]}
              rules={[{required: true,},]}
            >
              <Radio.Group style={{paddingLeft: 20}} onChange={(e) => RadioonChange(e.target.value)} value={value}>
                <Radio value={1}>
                  审核员
                </Radio>
                <Radio value={2}>
                  管理员
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24} style={{textAlign: 'center'}}>
            <Button type={"primary"} style={{width: 200}} onClick={() => onClickAdd()}>添加</Button>
          </Col>
        </Row>
      </div>
    </Form>

  </div>)
}
export default IntroCom;
