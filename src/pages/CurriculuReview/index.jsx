/**
 * Created by lidianzhong on 2020-05-14.
 * To: More pain, more gain.
 */

import React,{useState} from 'react';
import {Table,Pagination,Popover} from 'antd';
import {FormOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import Mock from 'mockjs';
import './styles.less';

const columns = [
  {
    title: '图片',
    dataIndex: 'img',
    key: 'img',
    render:(text,row)=>{
      return (
        <div style={{width:50,margin:'0 auto'}}>
          <Popover placement="right" style={{border:'1px solid #eee'}} content={()=>(<div style={{width:100,margin:'0 auto'}}><img style={{width:100,height:100}} alt="example" src={text}/></div>)} title="课程封面">
            <img style={{width:50,height:30}} alt="example" src={text}/>
          </Popover>
        </div>
      )}
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    title: '申请人',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: '金额',
    dataIndex: 'money',
    key: 'money',
  },
  {
    title: '佣金',
    dataIndex: 'commission',
    key: 'commission',
  },
  {
    title: '截止时间',
    dataIndex: 'deadline',
    key: 'deadline',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render:(text,row)=>{
      return (
        <div>
          <Link to={{pathname:"check/check",state:row}} style={{marginRight:10}}><FormOutlined style={{marginRight:8}}/>审核</Link>
        </div>
      )
    }
  },
];
const dataSource =Array(100)
  .fill(0, 0, 100)
  .map((item, i) => {
    return Mock.mock({
      "key": i,
      "img": 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      "title":  Mock.mock('@ctitle(3, 8)'),
      "money|100-200": 100,
      "commission|1-50": 20,
      "owner": "张三",
      "deadline": Mock.mock('@now("yyyy-MM-dd mm:hh:ss")'),
      "intro:":Mock.mock('@cparagraph()'),
      "bdeadline":Mock.mock('@now("yyyy-MM-dd mm:hh:ss")'),
      "bmoney|100-200": 100,
      "type|1":["在线","录制视频","面授"],
      "src":"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      "connect|1":["QQ","微信","手机号码"],
      "tel":"12345678901",
      "way|1":["付费开课","15%提成合作"],
      }
    )
  });

const CurriculuReviewPage = props=>{
  const [data,setData] = useState(dataSource.splice());

  return(<div style={{padding:"10px 50px"}}>
    <Table
      onChange={(pagination)=>{
        console.log(pagination);

      }}
      style={{textAlign:'center'}}
      columns={columns}
      dataSource={dataSource}
      size={"small"}
      bordered={true}
      pagination={{current:1,pageSize:20}}
      scroll={{y:360}}
    />
   {/* <Pagination
      onChange={()=>{}}
      onShowSizeChange={()=>{}}
      size="small"
      total={50}
      showSizeChanger
      showQuickJumper />*/}
  </div>)
}

export default CurriculuReviewPage;
