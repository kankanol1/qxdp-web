/**
 * Created by lidianzhong on 2020-05-19.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React from 'react';
import {Row,Button,Col,Avatar} from 'antd';

import { UserOutlined } from '@ant-design/icons';

import styles from '../../../styles.less'
const FeedbackItem=props=>{

  const {read} = props;
  return(
    <div style={{border:'1px solid #000',padding:10,height:100,marginBottom:4}}>
      <Row>
        <Col span={2}>
          <Row><Col span={24} style={{textAlign:'center'}}>
            <Avatar size={52} icon={<UserOutlined />} />
          </Col></Row>
          <Row><Col span={24} style={{textAlign:'center'}}>昵称</Col></Row>
        </Col>
        <Col span={20}>
          <div style={{borderLeft:'1px solid #000',borderRight:'1px solid #000',height:80,padding:10,overflow:'auto'}}>
            Pellentesque iaculis, augue eu bibendum posuere, erat orci vestibulum mi, id tempor augue enim ut sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris scelerisque orci sed sapien vulputate aliquam. Sed volutpat maximus libero eget porttitor. Ut a massa porta, dapibus justo sed, varius sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent neque arcu, aliquam ut eros sollicitudin, fermentum venenatis risus. Vestibulum eleifend ligula a odio tristique, et molestie lacus pretium. Etiam tempus ornare eros vel pharetra. Pellentesque in felis quam. In risus justo, congue ut quam vel, dictum dapibus nunc.
          </div>
        </Col>
        <Col span={2}>
          <div style={{textAlign:'center'}}>
            <Button className={styles["feedback-item"]} disabled={!read} type="primary">{!read?"已读":"未读"}</Button>
          </div>
        </Col>
      </Row>
    </div>

  )
}

export default FeedbackItem;
