/**
 * Created by lidianzhong on 2020-05-14.
 * To: More pain, more gain.
 */

import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {LeftOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import {Row,Col} from 'antd';
import FeedbackItem from "./components/ItemDetail";
const UserFeedbackPage = props=>{

  return(<PageHeaderWrapper pageHeaderRender={e=>{
    const data = e.breadcrumb.routes;
    return (<div style={{paddingTop:20,paddingLeft:20}}>
      <Link to={"/feedback"}><LeftOutlined />{data[1]?data[1].breadcrumbName:null}</Link>
      <span style={{padding:"0 10px"}}>|</span>
      <span>举报/意见反馈</span>
    </div>)
  }} title={false}>
    <h4>用户反馈界面</h4>
    <div>
      <FeedbackItem read={true}/>
      <FeedbackItem read={false}/>
    </div>
  </PageHeaderWrapper>)
}

export default UserFeedbackPage;
