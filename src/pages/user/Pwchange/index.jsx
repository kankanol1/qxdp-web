/**
 * Created by lidianzhong on 2020-04-13.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React from 'react';
import { Tabs } from 'antd';
import ChangePass from './components/ChangePass'
const { TabPane } = Tabs;


const Pwchange = ()=>{
  function callback(key) {
    console.log(key);
  }

  return (
    <div style={{minHeight:`${document.documentElement.clientHeight-112}px`,backgroundColor:'#fff',padding:50}}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="密码修改" key="1">
          <ChangePass/>
        </TabPane>
        <TabPane tab="其他" key="2">
          其他设置
        </TabPane>
      </Tabs>,
    </div>
  )
}

export default Pwchange;
