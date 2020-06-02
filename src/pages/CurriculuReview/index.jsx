/**
 * Created by lidianzhong on 2020-05-14.
 * To: More pain, more gain.
 */

import React, {useEffect, useState} from 'react';
import {Table,Pagination,Popover} from 'antd';
import {FormOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import {connect} from 'dva';
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

const CurriculuReviewPage = props=>{
  const {curriculu,dispatch} = props;
  const {dataSource,} = curriculu;

  useEffect(()=>{
    dispatch({
      type:'curriculu/get',
    })
  },[]);


  const queryFun=(page,size)=>{
    dispatch({
      type:'curriculu/query',
      payload:{page,size}
    })
  }


  return(<div style={{margin:"10px 50px",border:'1px solid #eee'}}>
    <Table
      style={{textAlign:'center'}}
      columns={columns}
      dataSource={dataSource}
      size={"small"}
      bordered={false}
      // pagination={{current:1,pageSize:20}}
      pagination={false}
      scroll={{y:360}}
    />
    <div style={{height:45,width:'100%',padding:10,backgroundColor:'#fafafa',borderTop:'1px solid #eee'}}>
      <Pagination
        style={{float:'right'}}
        onChange={(page, pageSize)=>{
          queryFun(page, pageSize);
        }}
        onShowSizeChange={(current, size)=>{
          queryFun(current, size);
        }}
        size="small"
        total={200}
        showSizeChanger
        showQuickJumper />
    </div>

  </div>)
}

export default connect(({curriculu})=>({curriculu}))(CurriculuReviewPage);
