/**
 * Created by lidianzhong on 2020-05-14.
 * To: More pain, more gain.
 */

import React, {useEffect, useState} from 'react';
import {Table, Button, Popover, Row, Col, Input, Pagination} from 'antd';
import {EyeOutlined, AudioOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import {connect} from 'dva';
import ExportJsonExcel from 'js-export-excel';
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
const layout = {
  labelCol: {span: 12},
  wrapperCol: {span: 12},
};
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '图片',
    dataIndex: 'img',
    key: 'img',
    render: (text, row) => {
      return (
        <div style={{width: 50, margin: '0 auto'}}>
          <Popover placement="right" style={{border: '1px solid #eee'}} content={() => (
            <div style={{width: 100, margin: '0 auto'}}><img style={{width: 100, height: 100}} alt="example"
                                                             src={text}/></div>)} title="课程封面">
            <img style={{width: 50, height: 30}} alt="example" src={text}/>
          </Popover>
        </div>
      )
    }
  },

  {
    title: '金额',
    dataIndex: 'money',
    key: 'money',
  },
  {
    title: '单人次佣金',
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
    render: (text, row) => {
      return (
        <div>
          <Link to={{pathname: "cources/manage", state: row}} style={{marginRight: 10}}>
            <EyeOutlined style={{marginRight: 8}}/>查看</Link>
        </div>
      )
    }
  },
];
const name = {"key": "ID",
  "title": '名称',
  "owner": "申请人",
  "ownerdate":"申请日期",
  "check": "审核人",
  "checkdate": "审核日期",
  "img": '封面',
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

const CurriculuReviewPage = props => {
  const {courcespace, dispatch} = props;
  const {dataSource} = courcespace;
  const [heightY,setHeightY] = useState(window.innerHeight-270);

  useEffect(() => {
    getData();
  }, []);

  const getData = ()=>{
    dispatch({
      type: 'courcespace/query',
      payload:{page:1,size:10},
    })
  }


  const queryFun = (page, size) => {
    dispatch({
      type: 'courcespace/query',
      payload: {page, size}
    })
  }

  const onSearch = props => {
    dispatch({
      type: 'courcespace/search',
      payload: {name: props},
    })
  }

  const onReset = () => {
    getData();
  }

  const exportExcel = () => {
    try {
      dispatch({
        type: 'courcespace/all',
        payload: {page:1, size:200} ,
        callback:res=>{
          if(res.status==="ok"){
            const option = {};
            option.fileName = 'course';
            option.datas = [
              {
                sheetData: res.dataSource,
                sheetName: 'sheet',
                sheetFilter: Object.entries(name).map(i=>{return i[0]}),
                sheetHeader: Object.entries(name).map(i=>{return i[1]}),
              },
            ];
            const toExcel = new ExportJsonExcel(option);
            toExcel.saveExcel();
          }
        }
      })
    }catch (e) {
      console.error(e);
    }
  }
  window.onresize = ()=>{
    setHeightY(window.innerHeight-270);
  }
  return (<div style={{padding: "10px 50px"}}>
    <Row style={{paddingBottom: 10}}>
      <Col span={24}>
        <Search
          // suffix={suffix}
          enterButton
          size="large"
          style={{float: "right", width: 300}}
          placeholder="课程名"
          onSearch={value => onSearch(value)}
        />
       {/* <Button
          size="large"
          type={"primary"}
          style={{float: "right", marginRight: "5px"}}
          onClick={() => onReset()}
        >
          重置
        </Button>*/}
        <Button
          size="large"
          type={"primary"}
          style={{float: "right", marginRight: "5px"}}
          onClick={() => exportExcel()}
        >
          导出
        </Button>
      </Col>
    </Row>
    <div style={{border: '1px solid #eee'}}>
      <Table
        style={{textAlign: 'center'}}
        columns={columns}
        dataSource={dataSource}
        size={"small"}
        bordered={true}
        pagination={false}
        scroll={{y: heightY}}
      />
    </div>

    <div style={{height: 50, width: '100%', padding: 10, backgroundColor: '#fafafa', border: '1px solid #eee'}}>
      <Pagination
        style={{float: 'right'}}
        onChange={(page, pageSize) => {
          queryFun(page, pageSize);
        }}
        onShowSizeChange={(current, size) => {
          queryFun(current, size);
        }}
        size="large"
        total={200}
        showSizeChanger
        showQuickJumper/>
    </div>
  </div>)
}

export default connect(({courcespace}) => ({courcespace}))(CurriculuReviewPage);
