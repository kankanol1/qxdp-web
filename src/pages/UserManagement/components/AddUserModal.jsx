/**
 * Created by lidianzhong on 2020-07-08.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React, {useState} from 'react';
import {Modal,Form,Row,Col,Input} from 'antd';

const layout = {labelCol: {span: 11,}, wrapperCol: {span: 12,},};

const f = {
  "key": "ID",
  "title": '名称',
  "img": '封面',
  "world":  "个性签名",
  "coursec":  "佣金盈利",
  "course":  "课程盈利",
  "open":  "禁止开课",
  "cash":  "禁止提现",
  "total":  "总收入",
  "owner": "申请人",
  "ownerdate":"申请日期",
  "check": "审核人",
  "checkdate": "审核日期",
  "money": "金额",
  "bmoney":"预售金额",
  "bdate":"预售日期",
  "commission": "单人次佣金",
  "number": "人数",
  "feedback": "举报数",
  "deadline":"截止日期",
  "intro:":"介绍",
  "type":"授课形式",
  "src":"资料地址",
  "connect":"联系方式",
  "tel":"手机号",
  "way":"付费方式"
}

const AddUserModal = props =>{
  const {children} =props;
  const [form] = Form.useForm();
  const [visible,setVisible] = useState(false);

  const onSubmit = ()=>{

  }
  return(
    <div>
      <span onClick={()=>setVisible(true)}>{children}</span>
      <Modal
        width={800}
      visible={visible}
      onCancel={()=>setVisible(false)}
      onOk={()=>onSubmit()}
      title={"添加用户"}
      >


        <Form form={form} name="control-hooks" {...layout}>
          <Row>
            {
              Object.entries(f).map((i,j)=><Col span={6} key={j} >
                <Form.Item name={i[0]} label={i[1]} rules={[{required: true},]}>
                  <Input size={'small'}/>
                </Form.Item>
              </Col>)
            }
          </Row>


        </Form>

      </Modal>
    </div>
  )

}
export default AddUserModal;
