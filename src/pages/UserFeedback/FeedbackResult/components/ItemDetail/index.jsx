/**
 * Created by lidianzhong on 2020-05-19.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React from 'react';
import {Row,Button,Col,Avatar,Tooltip} from 'antd';

import { UserOutlined } from '@ant-design/icons';
import styles from '../../../styles.less'
const FeedbackItem=props=>{

  const {read,data} = props;
  return(
    <div style={{border:'1px solid #000',padding:10,height:100,marginBottom:4}}>
      <Row>
        <Col span={2}>
          <Row><Col span={24} style={{textAlign:'center'}}>
            <Avatar size={52} icon={<UserOutlined />} />
          </Col></Row>
          <Row><Col span={24} style={{textAlign:'center',padding:"0 10px",fontSize:12,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
            <Tooltip placement="bottom" title={data.title}>
              {data.title}
            </Tooltip>
          </Col></Row>
        </Col>
        <Col span={20}>
          <div style={{borderLeft:'1px solid #000',borderRight:'1px solid #000',height:80,padding:10,overflow:'auto'}}>
            {data.context}
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
