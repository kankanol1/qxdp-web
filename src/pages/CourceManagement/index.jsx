/**
 * Created by lidianzhong on 2020-05-14.
 * To: More pain, more gain.
 */

import React,{useState} from 'react';
import {Table,Button,Popover,Row,Col,Input} from 'antd';
import {EyeOutlined,AudioOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import Mock from 'mockjs';
import './styles.less';


const {Search} = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

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
    title: '人数',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '举报数',
    dataIndex: 'feedback',
    key: 'feedback',
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
          <Link to={{pathname:"cources/manage",state:row}} style={{marginRight:10}}>
            <EyeOutlined style={{marginRight:8}} />查看</Link>
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
      "number|1-50": 20,
      "feedback|1-50": 20,
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
  const [data,setData] = useState(dataSource);

  const onSearch = props=>{
    console.log(props);
    setData(data.filter(item=>item.title.indexOf(props)>=0))
  }

  const onReset = ()=>{
    console.log(props);
    setData(data);
  }

  return(<div style={{padding:"10px 50px"}}>
    <Row style={{paddingBottom: 10}}>
      <Col span={24}>
        <Search
          // suffix={suffix}
          enterButton
          size="large"
          style={{float:"right",width: 200}}
          placeholder="课程名"
          onSearch={value => onSearch(value)}
        />
        <Button
          size="large"
          type={"primary"}
          style={{float:"right",marginRight: "5px"}}
          onClick={()=>onReset()}
        >
          重置
        </Button>
      </Col>
    </Row>
    <Table
      onChange={(pagination)=>{
        console.log(pagination);

      }}
      style={{textAlign:'center'}}
      columns={columns}
      dataSource={data}
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
