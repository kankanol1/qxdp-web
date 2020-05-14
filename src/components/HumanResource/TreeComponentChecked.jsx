import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { connect } from 'dva';
import { Row, Col, Button, Tree, Form, Input, Select } from 'antd';




function TreeComponent(props) {
    const { TreeNode } = Tree;
    const { targetKeys,treeData, selectInfo, form, curHigherinstitutions, changeCurHigherinstitutionsVal: changeCurHigherinstitutionsVal,changeTargetKeys:changeTargetKeys } = props
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [expandedKeys,setExpandedKeys] = useState(targetKeys);
    console.log(targetKeys)
    function higherinstitutionsSelect(selectedKeys, info) {
        
        if(selectedKeys.length==0) return;
        let infoKey = selectedKeys[0]
        let information = selectInfo[infoKey]
        let infoArr = information.split('&')
        let mid = infoArr[1]
        let pid = infoArr[2]
        let dcode = infoArr[3]
        let dname = infoArr[4]
        let dsname = infoArr[5]
        let level = infoArr[6]
        let dscope = infoArr[7]
        let ddesc = infoArr[8]
        let rcode = infoArr[9]
        let pcode = infoArr[10]
        let principal = infoArr[11]
        let order = infoArr[12]
        let at = infoArr[13]
        let status = infoArr[14]
        
        changeCurHigherinstitutionsVal(selectInfo[selectedKeys[0]])
        form.resetFields()
        form.setFieldsValue({
            higherinstitutions: infoKey+'_'+dname,
            higherinstitutionnumber: infoKey,
            higherinstitutionname: dname,
            dcode: dcode,
            dsname: dsname,
            dscope: dscope,
            ddesc: ddesc,
            rcode: rcode,
            pcode: pcode,
            principal: principal,
        })

    };

   function onExpand(expandedKeys) {
     setExpandedKeys(expandedKeys)
     setAutoExpandParent(false)
   }
    function getByParentId(parentId) {
        return treeData.filter(item => {
            return item.parentId === parentId;
        })
    }

    function renderTreeNode(parentId) {
     
        // 先找到子级节点
        var tmp = getByParentId(parentId);
        if (tmp.length > 0) {
            // 遍历铺页面，如果数组长度不为0则证明子级不为空
            return tmp.map(item => {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {renderTreeNode(item.key)}
                    </TreeNode>
                );
            })
        }
    }


    return (
        <Tree
            defaultExpandedKeys={['1']}
            defaultSelectedKeys={['1']}
            // defaultCheckedKeys={['00']}
            // onSelect={higherinstitutionsSelect}
            checkable
            checkStrictly = {true}
            checkedKeys = {targetKeys}
            onCheck = {changeTargetKeys}
            autoExpandParent={autoExpandParent}
            expandedKeys={expandedKeys}
            onExpand = {onExpand}
        >
            {renderTreeNode("-1")}
        </Tree>
    );

}

export default connect(({ departmentData }) => ({ departmentData }))(TreeComponent);

