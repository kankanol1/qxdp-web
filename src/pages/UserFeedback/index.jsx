/**
 * Created by lidianzhong on 2020-05-14.
 * To: More pain, more gain.
 */

import React from 'react';
import {Row,Col,List,Badge} from 'antd';
import CurvedComponent from "./components/CurvedComponent";
import DataVisibleComponent2 from "./components/DataVisibleComponent2";
import {DoubleRightOutlined} from '@ant-design/icons';
import {Link} from 'umi'
import styles from './styles.less'

const data = [
  {title: '新开课程一',},
  {title: '新开课程二',},
  {title: '新开课程三',},
  {title: '新开课程四',},
  {title: '新开课程五',},
  {title: '新开课程六',},
  {title: '新开课程七',},
  {title: '新开课程八',},
  {title: '新开课程九',},
  {title: '新开课程十',},
  {title: '新开课程十一',},
  {title: '新开课程十二',},
  {title: '新开课程十三',},
  {title: '新开课程十四',},
  {title: '新开课程十五',},
];

const dataList=[
  {
    title:'用户分享',
    data:[
      {item: '一次分享', count: 50,},
      {item: '两次分享', count: 20,},
      {item: '多次分享', count: 30,},
    ]
  },
  {
    title:'购课率',
    data:[
      {item: '一次购课', count: 50,},
      {item: '两次购课', count: 20,},
      {item: '多次购课', count: 30,},
    ]
  },
  {
    title:'开课率',
    data:[
      {item: '已开课', count: 50,},
      {item: '待审核', count: 20,},
      {item: '已拒绝', count: 30,},
    ]
  },
  {
    title:'课程举报率',
    data:[
      {item: '被举报', count: 20,},
      {item: '正常', count: 80,},
    ]
  }
]

const UserFeedbackPage = props=>{

  return(<div>
    <Row>
      <Col span={8}>
        <div className={styles["context-box"]}>
          <h3 style={{textAlign:'center'}}>新开课程</h3>
          <div className={styles["course-box"]}>
            <List
              itemLayout="horizontal"
              bordered={true}
              split={true}
              size={"small"}
              dataSource={data}
              renderItem={(item ,i)=> (
                <List.Item  className={styles["list-item"]} key={i}>
                  <List.Item.Meta
                    title={item.title}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </Col>
      <Col span={16}>
       <Row>
         {dataList&&dataList.map(item=><Col key={item.title} span={12}>
           <DataVisibleComponent2 dataAll={item}/>

         </Col>)}
       </Row>
      </Col>
    </Row>
    <Row>
      <Col offset={20} span={4}>
        <div style={{marginRight:10,padding:2,textAlign:'right'}}>
            <Link to={"feedback/advice"}>意见和建议<DoubleRightOutlined /></Link>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <CurvedComponent/>
      </Col>
    </Row>
  </div>)
}
export default UserFeedbackPage;
