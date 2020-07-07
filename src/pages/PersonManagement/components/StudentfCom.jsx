/**
 * Created by lidianzhong on 2020-06-01.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React, {useEffect, useState} from 'react';
import {connect} from 'dva';
import {Pagination, Popover, Table} from 'antd';
import request from "@/utils/request";

const columns = [
  {
    title: '头像',
    dataIndex: 'img',
    key: 'img',
    render: (text, row) => {
      return (
        <div style={{width: 50, margin: '0 auto'}}>
          <Popover placement="right" style={{border: '1px solid #eee'}} content={() => (
            <div style={{width: 100, margin: '0 auto',}}><img style={{width: 100, height: 100, borderRadius: "50%"}}
                                                              alt="example"
                                                              src={text}/></div>)} title="头像">
            <img style={{width: 30, height: 30, borderRadius: "50%"}} alt="example" src={text}/>
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
    title: '审核数量',
    dataIndex: 'checks',
    key: 'checks',
  },
  {
    title: '手机号',
    dataIndex: 'tel',
    key: 'tel',
  },
];

const studentfCom = (props)=>{
  const {type} = props;
  const [dataSource,setDataSource] = useState([]);
  const [page,setPage] = useState({});
  const [heightY,setHeightY] = useState(window.innerHeight-360>670?670:window.innerHeight-360);

  useEffect(()=>{
    queryFun(1, 10);
  }, [])

  const queryFun = (page, size) => {
    request('/api/person/'+type,{
      method:"POST",
      params: {page, size,role:type},
    }).then(res=>{
      if(res.status==='ok'){
        setDataSource(res.dataSource)
        if (res.page) setPage(res.page);
      }
    })
  }

  window.onresize=()=>{
    setHeightY(window.innerHeight-360>670?670:window.innerHeight-360);
  }

  return (<div style={{boxShadow:'2px 2px 4px #999'}}>
    <div style={{border: '1px solid #eee'}}>
      <Table
        style={{textAlign: 'center'}}
        columns={columns}
        dataSource={dataSource}
        size={"small"}
        bordered={false}
        pagination={false}
        scroll={{y: heightY,scrollToFirstRowOnChange: true}}
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
        total={page.total||1}
        showSizeChanger
        showQuickJumper/>
    </div>
  </div>)
}

export default connect()(studentfCom);
