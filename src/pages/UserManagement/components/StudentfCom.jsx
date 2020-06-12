/**
 * Created by lidianzhong on 2020-06-01.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React, {useEffect, useState} from 'react';
import {connect} from 'dva';
import {Col,Button, Pagination, Popover, Table} from 'antd';
import ExportJsonExcel from "js-export-excel";


const columns = [
  {
    title: '头像',
    dataIndex: 'img',
    key: 'img',
    render: (text, row) => {
      return (
        <div style={{width: 50, margin: '0 auto'}}>
          <Popover placement="right" style={{border: '1px solid #eee'}} content={() => (
            <div style={{width: 100, margin: '0 auto'}}><img style={{width: 100, height: 100,borderRadius:"50%"}} alt="example"
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
  useEffect(()=>{
    getCourses();
  }, [])

  const getCourses = ()=>{
    if(data&&data.key){
      dispatch({
        type: 'students/courses',
        payload: {page:1, size:10,id:data.key},
        callback: res=>{
          if(res.status==='ok'){
            setDataSource(res.dataSource)
          }
        }
      })
    }
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
  const queryFun = (page, size) => {
    if(data&&data.key){
      dispatch({
        type: 'student/courses',
        payload: {page, size,id:data.key},
        callback: res=>{
          if(res.status==='ok'){
            setDataSource(res.dataSource)
          }
        }
      })
    }
  }
  return (<div style={{boxShadow:'2px 2px 4px #999'}}>
    <div style={{border: '1px solid #eee'}}>
      <div style={{padding:'2px 10px',borderBottom:'1px solid #eee'}}>
        <span>{title}</span>
        <Button style={{float:"right"}} type={"primary"} size={"small"} onClick={()=>exportExcel()}>导出</Button>
      </div>
      <Table
        style={{textAlign: 'center'}}
        columns={columns}
        dataSource={dataSource}
        size={"small"}
        bordered={false}
        pagination={false}
        scroll={{y: 260}}
      />
    </div>
    <div style={{height: 30, width: '100%', paddingRight: 10, backgroundColor: '#fafafa', border: '1px solid #eee'}}>
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
