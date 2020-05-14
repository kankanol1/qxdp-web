import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'dva';
import { Tree,} from 'antd';


function TestTreeComponent(props) {
    const { TreeNode } = Tree;
    const { treeData, selectInfo, form, curHigherinstitutions, changeCurHigherinstitutionsVal: changeCurHigherinstitutionsVal } = props
    console.log(treeData)

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
            onSelect={higherinstitutionsSelect}

        >
            {/*先找到所有parentId为-1的顶级节点*/}
            {renderTreeNode("-1")}
        </Tree>
    );

}

export default connect(({ departmentData }) => ({ departmentData }))(TestTreeComponent);

