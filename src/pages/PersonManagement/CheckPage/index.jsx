/**
 * Created by lidianzhong on 2020-07-07.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React, {useEffect, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import { DoubleLeftOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import {connect} from 'dva';
import {Row, Col, Button,Popover, Table, Pagination} from 'antd';
import styles from '../styles.less'
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

const UserFeedbackPage = props => {
  const {location} = props;
  const {state} = location;
  console.log(state);

  const onClick = ()=>{
  }
  const [dataSource,setDataSource] = useState([]);
  const [page,setPage] = useState({});
  const [heightY,setHeightY] = useState(window.innerHeight-440>670?670:window.innerHeight-440);

  useEffect(()=>{
    queryFun(1, 10);
  }, [])

  const queryFun = (page, size) => {
    request('/api/person/all',{
      method:"POST",
      params: {page, size},
    }).then(res=>{
      if(res.status==='ok'){
        setDataSource(res.dataSource)
        if (res.page) setPage(res.page);
      }
    })
  }

  window.onresize=()=>{
    setHeightY(window.innerHeight-440>670?670:window.innerHeight-440);
  }
  return (<div style={{padding:20,height:120}}>
    <PageHeaderWrapper pageHeaderRender={e => {
      const data = e.breadcrumb.routes;
      return (<div style={{paddingTop: 20, paddingLeft: 20}}>
        <Link to={"/person"}><DoubleLeftOutlined/>{data[1] ? data[1].breadcrumbName : null}</Link>
        <span style={{padding: "0 10px"}}>|</span>
        <span>平台人员信息</span>
      </div>)
    }} title={false}>
      <div className={styles["advice-style"]}>
        <Row style={{padding:20,border:'1px solid #eee'}}>
          <Col span={12}>
            <Row>
              <Col offset={6} span={6}>
                <img style={{borderRadius:'50%',display:'block',width:100,height:100}} src={state.img} alt=""/>
              </Col>
              <Col span={6} style={{fontSize:18,padding:20}}>
                <Row>
                  <Col>昵称：</Col>
                </Row> <Row>
                  <Col>审核数量：</Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={4} style={{lineHeight:"100px"}}>
            <Button type={"primary"} onClick={()=>onClick()}>删除</Button>
          </Col>
        </Row>
        <div>
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
        </div>
      </div>
    </PageHeaderWrapper>
  </div>)
}
export default connect()(UserFeedbackPage);
