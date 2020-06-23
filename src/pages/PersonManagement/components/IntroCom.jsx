/**
 * Created by lidianzhong on 2020-06-04.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React, {useRef} from 'react';
import {Row, Radio, Col, Checkbox, Form, Input} from 'antd';
import courseStyles from "@/pages/CurriculuReview/CheckPage/madal.less";
import request from "@/utils/request";

const layout = {
  labelCol: {span: 12},
  wrapperCol: {span: 12},
};

const IntroCom = props => {
  const {state} = props;
  const [courses] = Form.useForm();
  const handleOk = () => {
    courses.validateFields().then(values => {
      console.log(values)
      if (!values.hasOwnProperty("outOfDate")) {
        request('/api/check/query',{
          method:"POST",
          params: values,
        }).then(res=>{
          if(res.status==='ok'){
            message.destroy();
            message.success("成功！")
          }
        })
      }
    }).catch(err => {
      console.log(err);
    });
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
              <Input className={courseStyles["goods-input"]} size={"small"}/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="密码"
              name={["password"]}
              rules={[{required: true,},]}
            >
              <Input className={courseStyles["goods-input"]} size={"small"}/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="昵称"
              name={["nickname"]}
              rules={[{required: true,},]}
            >
              <Input className={courseStyles["goods-input"]} size={"small"}/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="头像"
              name={["ivatar"]}
              rules={[{required: true,},]}
            >
              <Input className={courseStyles["goods-input"]} size={"small"}/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="头像"
              name={["ivatar"]}
              rules={[{required: true,},]}
            >
              <Input className={courseStyles["goods-input"]} size={"small"}/>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </Form>

  </div>)
}
export default IntroCom;
