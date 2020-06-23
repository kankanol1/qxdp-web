/**
 * Created by lidianzhong on 2020-06-01.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React, {useEffect, useState} from 'react';
import {connect} from 'dva';
import {Col,Button, Pagination, Popover, Table} from 'antd';
import ExportJsonExcel from "js-export-excel";
import request from "@/utils/request";


const columns = [
  {
    title: '封面',
    dataIndex: 'img',
    key: 'img',
    render: (text, row) => {
      return (
        <div style={{width: 50, margin: '0 auto'}}>
          <Popover placement="right" style={{border: '1px solid #eee'}} content={() => (
            <div style={{margin: '0 auto'}}><img style={{width: 300, height: 400}} alt="example"
                                                             src={text}/></div>)} title="封面">
            <img style={{width: 30, height: 30}} alt="example" src={text}/>
          </Popover>
        </div>
      )
    }
  },
  {
    title: '课程名',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '手机号',
    dataIndex: 'tel',
    key: 'tel',
  },
];
const name = {
  "key": "ID",
  "img": '头像',
  "title": '昵称',
  "tel":"手机号",
}
const studentfCom = props=>{
  const {data,title,dispatch} = props;
  const [dataSource,setDataSource] = useState([]);
  const [heightY,setHeightY] = useState(window.innerHeight-360>670?670:window.innerHeight-360);
  useEffect(()=>{
    getCourses();
  }, [])

  const getCourses = ()=>{
    request('/api/person/query',{
      method:"POST",
      params: {page:1, size:10},
    }).then(res=>{
      if(res.status==='ok'){
        setDataSource(res.dataSource)
      }
    })
  }
  const queryFun = (page, size) => {
    request('/api/person/query',{
      method:"POST",
      params: {page, size},
    }).then(res=>{
      if(res.status==='ok'){
        setDataSource(res.dataSource)
      }
    })
  }

  const exportExcel = () => {
    try {
      dispatch({
        type: 'students/courcesa',
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

  window.onresize=()=>{
    setHeightY(window.innerHeight-360>670?670:window.innerHeight-360);
  }
  return (<div style={{boxShadow:'2px 2px 4px #999'}}>
    <div style={{border: '1px solid #eee'}}>
      {/*<div style={{padding:'2px 10px',borderBottom:'1px solid #eee'}}>
        <span>{title}</span>
        <Button style={{float:"right"}} type={"primary"} size={"small"} onClick={()=>exportExcel()}>导出</Button>
      </div>*/}
      <Table
        style={{textAlign: 'center'}}
        columns={columns}
        dataSource={dataSource}
        size={"small"}
        bordered={false}
        pagination={false}
        scroll={{y: heightY}}
      />
    </div>
    <div style={{height: 40, width: '100%', paddingRight: 10, backgroundColor: '#fafafa', border: '1px solid #eee'}}>
      <Pagination
        style={{float: 'right'}}
        onChange={(page, pageSize) => {
          queryFun(page, pageSize);
        }}
        onShowSizeChange={(current, size) => {
          queryFun(current, size);
        }}
        size="small"
        total={200}
        showSizeChanger
        showQuickJumper/>
    </div>
  </div>)
}

export default connect()(studentfCom);
