/**
 * Created by lidianzhong on 2020-06-12.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React, {useState} from 'react';
import {Modal, Form,Space, Select, Input, Button, Row, Col, Checkbox} from 'antd';
import styles from './madal.less';
import courseStyles from './madal.less';
import {connect} from 'dva';

const {Option} = Select;

const layout = {
  labelCol: {span: 12},
  wrapperCol: {span: 12},
};
const ModalComponent = props => {
  let {children, dispatch} = props;
  const [visible, setVisible] = useState(false);
  const [course] = Form.useForm();

  // 渲染footer
  const footerArray = () => {
    return [
      <Button key="reset" onClick={() => onTest()}>
        测试
      </Button>,
      <Button key="back" onClick={() => setVisible(false)}>
        返回
      </Button>,
      <Button key="submit" type="primary" onClick={() => handleOk()}>
        提交
      </Button>,
    ]
  }
  const handleOk = () => {
    course.validateFields().then(values => {
      console.log(values)
      if (!values.hasOwnProperty("outOfDate")) {
        dispatch({
          type:'curriculu/add',
          payload:values,
          callback:res=>{
            if(res.success==="ok"){
              message.destroy();
              message.success("提交成功！")
            }
          }
        })
      }
    }).catch(err => {
      console.log(err);
    });
  }
  const onTest = () => {
    const data = {
      bmoney: "90",
      checked: 0,
      commission: 23,
      connect: "123456789010",
      deadline: "2020-09-02 12:01:12",
      bdeadline: "2020-09-02 12:01:12",
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      intro: "学会一门语言就是打开了人生的另一扇门！",
      money: 100,
      owner: "狄仁杰",
      tel: "18324582718",
      title: "Python课程",
      type: "面授",
      way: "15%提成合作",
    }
    course.setFieldsValue(data);
  }
  return (
    <div>
      {<a onClick={() => setVisible(true)}>
        {children}
      </a>}
      <Modal
        width={800}
        visible={visible}
        title={"添加"}
        onOk={() => handleOk()}
        onCancel={() => setVisible(false)}
        footer={footerArray()}
        bodyStyle={{padding: "6px 10px"}}
      >
        <div className={styles["modal-div"]}>
          <Form {...layout} form={course} onFinish={() => handleOk()}>
            <div className={courseStyles["base-info"]}>
              <Row>
                <Col span={10}>
                  <Form.Item
                    label="课程名称"
                    name={["title"]}
                    rules={[{required: true,},]}
                  >
                    <Input className={courseStyles["goods-input"]} size={"small"}/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="课程图片"
                    name={["img"]}
                    rules={[{required: true, message: '必填！',},]}
                  >
                    <Input className={courseStyles["goods-input"]} size={"small"}/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="金额"
                    name={["money"]}
                    rules={[{required: true, message: '必填！',},]}
                  >
                    <Input className={courseStyles["goods-input"]} size={"small"}/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="佣金"
                    name={["commission"]}
                    rules={[{required: true, message: '必填！',},]}
                  >
                    <Input className={courseStyles["goods-input"]} size={"small"}/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="申请人"
                    name={["owner"]}
                    rules={[{required: true, message: '必填！',},]}
                  >
                    <Input className={courseStyles["goods-input"]} size={"small"}/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="截止日期"
                    name={["deadline"]}
                    rules={[{required: true, message: '必填！',},]}
                  >
                    <Input className={courseStyles["goods-input"]} size={"small"}/>
                  </Form.Item>
                </Col> <Col span={10}>
                  <Form.Item
                    label="预售时间"
                    name={["bdeadline"]}
                    rules={[{required: true, message: '必填！',},]}
                  >
                    <Input className={courseStyles["goods-input"]} size={"small"}/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="简介"
                    name={["intro"]}
                    rules={[{required: true, message: '必填！',},]}
                  >
                    <Input className={courseStyles["goods-input"]} size={"small"}/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="预售金额"
                    name={["bmoney"]}
                    rules={[{required: true, message: '必填！',},]}
                  >
                    <Input className={courseStyles["goods-input"]} size={"small"}/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="开课形式"
                    name={["type"]}
                    rules={[{required: true, message: '必填！',},]}
                  >
                    <Input className={courseStyles["goods-input"]} size={"small"}/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="联系方式"
                    name={["connect"]}
                    rules={[{required: true, message: '必填！',},]}
                  >
                    <Input className={courseStyles["goods-input"]} size={"small"}/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="资源地址"
                    name={["src"]}
                    rules={[{required: true, message: '必填！',},]}
                  >
                    <Input className={courseStyles["goods-input"]} size={"small"}/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="付费方式"
                    name={["way"]}
                    rules={[{required: true, message: '必填！',},]}
                  >
                    <Input className={courseStyles["goods-input"]} size={"small"}/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="紧急联系方式"
                    name={["tel"]}
                    rules={[{required: true, message: '必填！',},]}
                  >
                    <Input className={courseStyles["goods-input"]} size={"small"}/>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="审核"
                    name={["checked"]}
                    rules={[{required: true, message: '必填！',},]}
                  >
                    <Input className={courseStyles["goods-input"]} size={"small"}/>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default connect()(ModalComponent);
