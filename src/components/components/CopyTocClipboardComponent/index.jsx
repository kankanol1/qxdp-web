/**
 * Created by lidianzhong on 2020-05-08.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
/*****************************************  点击复制 *********************************************/
import React from 'react';
import {Tooltip,message} from 'antd';
import copy from 'copy-to-clipboard';
import styles from './style.less'

/*
*
* @params text  首先 判断 参数text
*               然后 子节点
*               最后  默认 请设置内容
* @params size  默认14
* 案例:
*         <CopyTocClipboardComponent text={"模块测试区"} size={20}/>
* 或者
*         <CopyTocClipboardComponent> 模块测试区 </CopyTocClipboardComponent>
* 或者
*         <CopyTocClipboardComponent> <span>模块测试区</span> </CopyTocClipboardComponent>
* 根据需要设置参数和子节点
* */

const  CopyTocClipboardComponent=props=>{
  const {text,size,children} = props;
  const copyText=(e)=>{
    message.destroy();
    copy(e);
    message.success("复制成功!");
  }
  return (
    <Tooltip title={"点击复制"}>
       <span
         style={{cursor:"pointer",fontSize:size?size:14}}
         className={styles["copy-text"]}
         onClick={(e)=>copyText(e.target.innerText)}>
      {text?text:children?children:"请设置内容"}
    </span>
    </Tooltip>
  )
}

/****************************************  /点击复制  *********************************************/

export default CopyTocClipboardComponent;
