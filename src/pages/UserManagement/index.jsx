/**
 * Created by lidianzhong on 2020-05-14.
 * To: More pain, more gain.
 */

import React, {useEffect, useState} from 'react';
import {connect} from 'dva';
import ExportJsonExcel from "js-export-excel";
import {Button, Col, Input, Pagination, Popover, Row, Table, Tooltip} from "antd";
import {Link} from "umi";
import {EyeOutlined} from "@ant-design/icons";
import Mock from "mockjs";
const {Search} = Input;


const columns = [

  {
    title: '头像',
    dataIndex: 'img',
    key: 'img',
    render: (text, row) => {
      return (
        <div style={{width: 50, margin: '0 auto'}}>
          <Popover placement="right" style={{border: '1px solid #eee'}} content={() => (
            <div style={{width: 100, margin: '0 auto',}}><img style={{width: 100, height: 100,borderRadius:"50%"}} alt="example"
                                                             src={text}/></div>)} title="头像">
            <img style={{width: 30, height: 30,borderRadius:"50%"}} alt="example" src={text}/>
          </Popover>
        </div>
      )
    }
  },
  {
    title: '昵称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '个性签名',
    dataIndex: 'world',
    key: 'world',
    render: (text, row) => {
      return (
        <Tooltip title={text}>
          <a style={{
            width: 200,
            display: "inline-block",
            overflow: "hidden",
            textOverflow: 'ellipsis',
            whiteSpace: "nowrap"
          }}>
            {text}
          </a>
        </Tooltip>
      )
    }
  },

  {
    title: '总收入',
    dataIndex: 'money',
    key: 'money',
  },

  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render: (text, row) => {
      return (
        <div>
          <Link to={{pathname: "users/manage", state: row}} style={{marginRight: 10}}>
            <EyeOutlined style={{marginRight: 8}}/>查看</Link>
        </div>
      )
    }
  },
];
const name = {
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
const UserManagementPage = props => {
  const {students, dispatch} = props;
  const {dataSource} = students;
  const [heightY,setHeightY] = useState(window.innerHeight-270);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = ()=>{
    dispatch({
      type: 'students/query',
      payload: {page:1, size:10}
    })
  }
  const queryFun = (page, size) => {
    dispatch({
      type: 'students/query',
      payload: {page, size}
    })
  }

  const onSearch = props => {
    dispatch({
      type: 'students/search',
      payload: {name: props},
    })
  }

  const onReset = () => {
    getUsers()
  }

  const exportExcel = () => {
    try {
      dispatch({
        type: 'students/all',
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
          enterButton
          size="large"
          style={{float: "right", width: 300}}
          placeholder="昵称"
          onSearch={value => onSearch(value)}
        />
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

export default connect(({students}) => ({students}))(UserManagementPage);

