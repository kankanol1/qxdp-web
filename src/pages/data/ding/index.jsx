/**
 * Created by lidianzhong on 2020-05-11.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React, {useState, useEffect} from 'react';
import {
  DatePicker,
  Spin,
  message,
  Input,
  InputNumber,
  Select,
  Button,
  Tooltip,
  Popover,
  Checkbox,
  Table,
  Popconfirm,
  Divider,
  Row,
  Col,
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  PlusOutlined,
  RedoOutlined,
  ColumnHeightOutlined,
  SettingOutlined,
  EditOutlined,
  CloseOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  PushpinOutlined
} from '@ant-design/icons'
import CopyTocClipboardComponent from '@/components/components/CopyTocClipboardComponent';
import ModalComponent from "./components/ModalComponent";
import {connect} from 'dva'
import fullScreen from "@/utils/FullScreenFun";
import styles from './style.less'
import moment from 'moment';

const {Option} = Select;
const dateFormat = 'YYYY-MM-DD';
const densitySelect = [
  ["small", "紧凑"],
  ["middle", "中等"],
  ["default", "默认"],
]


const DingApp = props => {
  const [density, setDensity] = useState("small");
  const [densityShow, setDensityShow] = useState(false);
  const [settingShow, setSettingShow] = useState(false);
  const [isFullScreen, setFullScreen] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loadingFlush, setLoadingFlush] = useState(false);
  const [select, setSelect] = useState(undefined);
  const [dataColumns, setDataColumns] = useState(undefined);

  const {dynamicSpace, dispatch} = props;
  let {columns, data, layout} = dynamicSpace;
  const [checkitem, setCheckitem] = useState(columns.map(item=>item.title));

  columns = columns.map((item) => {
    if (item.valueType === "option") {
      item.render = (text, row, index, action) => ([
        <span key="see">
         <ModalComponent onChangeItem={onChangeItem} onChangeItemE={onChangeItemE} child="a"
                         title={"查看"} layout={layout} columns={columns}
                         details={row}>
            <EyeOutlined className={styles["gl-action"]}/><span>查看</span>
          </ModalComponent>
        </span>,
        <span key="editor">
        <ModalComponent onChangeItem={onChangeItem} onChangeItemE={onChangeItemE} child="a"
                        title={"编辑"} layout={layout} columns={columns}
                        details={row}>
            <EditOutlined className={styles["gl-action"]}/><span>编辑</span>
          </ModalComponent>
        </span>,
        <span key="delete">
          <Popconfirm title="确定删除吗？" onCancel={() => {
          }} onConfirm={() => deleteItem(row)}>
            <a> <CloseOutlined className={styles["gl-action"]}/>删除</a>
          </Popconfirm>
        </span>,
      ]);
      item.width = "200px";
    } else if (item.valueType === "date") {
      item.render = (text, row, index, action) => {
        return <div key={item.dataIndex}>
          <DatePicker
            onChange={(e) => {
              row[item.dataIndex] = moment(e).format(dateFormat);
              onChangeItem(row);
            }}
            onBlur={(e) => {
              row[item.dataIndex] = e.target.value;
              onChangeItemE(row);
            }}
            allowClear={false} style={{border: 'none'}}
            value={moment(row[item.dataIndex], dateFormat)}
            format={dateFormat}/>
        </div>;
      }
    } else if (item.valueType === "textArea") {
      item.render = (text, row, index, action) => {
        return <div key={item.dataIndex}>
          <Input.TextArea
            style={{border: 'none'}}
            value={row[item.dataIndex]}
            onChange={(e) => {
              row[item.dataIndex] = e.target.value;
              onChangeItem(row)
            }}
            onBlur={(e) => {
              row[item.dataIndex] = e.target.value;
              onChangeItemE(row);
            }}
          />
        </div>;
      }
    } else if (item.valueType === "number") {
      item.render = (text, row, index, action) => {
        return <div key={item.dataIndex}>
          <InputNumber
            allowClear={false}
            onChange={(e) => {
              row[item.dataIndex] = e;
              onChangeItem(row)
            }}
            onBlur={(e) => {
              row[item.dataIndex] = e.target.value;
              onChangeItemE(row);
            }}
            style={{border: 'none'}} value={row[item.dataIndex]}
          />
        </div>;
      }
      item = {
        ...item,
        /* defaultSortOrder: 'descend',
         sorter: (a, b) => a.age - b.age,*/
      }
    } else if (item.valueType === "text") {
      item.render = (text, row, index, action) => {
        return <div key={item.dataIndex}>
          <Input
            allowClear={false}
            onChange={(e) => {
              row[item.dataIndex] = e.target.value;
              onChangeItem(row)
            }}
            onBlur={(e) => {
              row[item.dataIndex] = e.target.value;
              onChangeItemE(row);
            }}
            style={{border: 'none'}} value={row[item.dataIndex]}
          />
        </div>;
      }
      item = {
        ...item,
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
          <div style={{padding: 8}}>
            <Input
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{width: 188, marginBottom: 8, display: 'block'}}
            />
            <div>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, item.dataIndex)}
                icon={<SearchOutlined/>}
                size="small"
                style={{width: 90}}
              >
                搜索
              </Button>
              <Button onClick={() => {
                confirm();
                getDataAll()
              }} size="small" style={{width: 90}}>
                重置
              </Button>
            </div>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,

      }
    } else if (item.valueType === "select") {
      item.render = (text, row, index, action) => {
        const options = columns.filter(i => i.valueType === "select")[0]["options"];
        return <div key={item.dataIndex} style={{backgroundColor: '#fff'}}>
          {<Select
            showSearch
            value={Object.values(text)}
            style={{width: 100}}
            onChange={(value, option) => {
              if (value && options.filter(f => f[option.key] === value)[0]) {
                let data = {};
                data[option.key] = option.value;
                row[item.dataIndex] = data;
                onChangeItem(row);
                setSelect(data);
              } else {
                setSelect(undefined);
              }
            }}
            onBlur={() => {
              if (select) {
                console.log(row, select);
                row[item.dataIndex] = select;
                onChangeItemE(row);
              }
            }}
            filterOption={true}
            showArrow={false}
            bordered={false}
            listHeight={100}
          >
            {options.map(j =>
              <Option
                key={Object.keys(j)[0]}
                value={Object.values(j)[0]}
              >
                {Object.values(j)[0]}
              </Option>)
            }
          </Select>}
        </div>;
      }
    } else {
      item.render = (text, row, index, action) => {
        return <div key={item.dataIndex}>
          <Input
            allowClear={false}
            onChange={(e) => {
              row[item.dataIndex] = e.target.value;
              onChangeItem(row)
            }}
            onBlur={(e) => {
              row[item.dataIndex] = e.target.value;
              onChangeItemE(row);
            }}
            style={{border: 'none'}} value={row[item.dataIndex]}
          />
        </div>;
      }
    }
    return item;
  })


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    dispatch({
      type: 'dynamicSpace/filter',
      payload: {dataIndex, value: selectedKeys[0]}
    })
  };

  // 组件渲染成功后加载数据
  useEffect(() => {
    getDataAll();
  }, [])

  // 获取数据
  const getDataAll = () => {
    setLoadingFlush(true);
    try {
      dispatch({
        type: 'dynamicSpace/get',
        callback: res => {
          if (res.status === 'ok') {
            setLoadingFlush(false);
          }
        }
      })
    } catch (e) {
      setLoadingFlush(false);
    }
  }

  // 修改 前端
  const onChangeItem = (item) => {
    dispatch({
      type: 'dynamicSpace/changeItem',
      payload: item
    })
  }

  // 修改 后台
  const onChangeItemE = (item) => {
    if (item.key) {
      try {
        dispatch({
          type: 'dynamicSpace/changeItemE',
          payload: item,
        });
        return {status: 'ok'}
      } catch (e) {

      }
    } else {
      item.key = data.length > 0 ? data[data.length - 1].key + 1 : 0;
      console.log("index", item);
      try {
        dispatch({
          type: 'dynamicSpace/add',
          payload: item,
        });
        return {status: 'ok'}
      } catch (e) {
      }
    }
  }

  // 可选行
  const rowSelection = {
    columnWidth: '60px',
    fixed: true,
    selectedRowKeys,
    onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
    hideDefaultSelections: true,
    type: "checkbox",
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      {
        key: 'even',
        text: '选择偶数行',
        onSelect: changableRowKeys => {
          setSelectedRowKeys(changableRowKeys.filter((key, index) => index % 2 === 0));
        },
      },
      {
        key: 'odd',
        text: '选择奇数行',
        onSelect: changableRowKeys => {
          setSelectedRowKeys(changableRowKeys.filter((key, index) => index % 2 !== 0));
        },
      },
    ]

  }

  // 修改密度函数
  const changeDensity = (size) => {
    setDensity(size);
    setDensityShow(false);
  }
  // 删除
  const deleteItem = row => {
    dispatch({
      type: 'dynamicSpace/deleteItem',
      payload: row,
      callback: res => {
        if (res.status === "ok") {
          setSelectedRowKeys([]);
        }
      }
    })
  }

  // 密度内容
  const content = (<div>
    {densitySelect.map(item =>
      <div key={item[0]} onClick={() => changeDensity(item[0])} className={styles["pop-style"]}
           style={{color: density === item[0] ? "#0189ff" : null}}>
        {item[1]}
      </div>)}
  </div>)

  //设置内容
  const onChangeCheck=checkedValues=>{
    setCheckitem(checkedValues);
    setDataColumns(columns.filter(i=>checkedValues.indexOf(i.title)>=0));
  }
  const setting = (<div>
    <Row>
      <Col span={18}><Checkbox
        indeterminate={!!checkitem.length&&checkitem.length<columns.length}
        onChange={e=>{
          setCheckitem(e.target.checked?columns.map(item=>item.title):[]);
          setDataColumns(e.target.checked?columns:[]);
        }}
        checked={dataColumns?dataColumns.length>0:true}>列展示</Checkbox></Col>
      <Col span={6}><a onClick={()=>{
        setDataColumns(columns);setSettingShow(false)
      }}>重置</a></Col>
    </Row>
    <Divider className={styles["gl-divider"]}/>
    <Checkbox.Group value={dataColumns?dataColumns.map(i=>i.title):columns.map(i=>i.title)}  style={{width: 160}} onChange={onChangeCheck}>
      {columns.map(i => <Row key={i.dataIndex} className={styles["gl-item-box"]}>
        <Col span={18}>
          <Checkbox value={i.title}>{i.title}</Checkbox>
        </Col>
        <Col span={3}>
          <Tooltip title="固定到左边">
            <PushpinOutlined className={styles['gl-item']} rotate={-90}/>
          </Tooltip>
        </Col>
        <Col span={3}>
          <Tooltip title="固定到右边">
            <PushpinOutlined  className={styles['gl-item']} />
          </Tooltip>
        </Col>
      </Row>)
      }
    </Checkbox.Group>
  </div>)

  return (<div id="fullscreen" className={styles["gl-body"]}>
    <h4 className={styles["gl-text"]}>
      <CopyTocClipboardComponent text={"函数测试区"} size={20}/>
    </h4>
    <div>
      {columns.length>0?<div id="glTable">
        <div className={styles["gl-setting"]}>
          <Tooltip title={"密度"} className={styles["gl-full"]}>
            <Popover
              placement="bottom"
              className={styles["gl-full-screen"]}
              content={content}
              trigger="click"
              visible={densityShow}
              onBlur={()=>SetDensityShow(false)}

            >
              <div className={styles["gl-full-screen"]} onClick={() => setDensityShow(true)}>
                <ColumnHeightOutlined/>
              </div>
            </Popover>
          </Tooltip>
          <Tooltip title={isFullScreen ? "全屏" : "退出全屏"} className={styles["gl-full"]}>
            <div className={styles["gl-full-screen"]} onClick={() => {
              fullScreen('glTable');
              setFullScreen(!isFullScreen);
            }}>
              {isFullScreen ? <FullscreenOutlined/> : <FullscreenExitOutlined/>}
            </div>
          </Tooltip>
          <Tooltip title={"刷新"} className={styles["gl-full"]}>
            <div className={styles["gl-full-screen"]} onClick={() => getDataAll()}>
              <RedoOutlined/>
            </div>
          </Tooltip>
          <Tooltip title={"设置"} className={styles["gl-full"]}>
            <Popover
              placement="bottom"
              className={styles["gl-full-screen"]}
              content={setting}
              trigger="click"
              visible={settingShow}
              onBlur={()=>setSettingShow(false)}
            >
              <div className={styles["gl-full-screen"]} onClick={() => setSettingShow(true)}>
                <SettingOutlined/>
              </div>
            </Popover>
          </Tooltip>
          <ModalComponent
            onChangeItem={onChangeItem}
            onChangeItemE={onChangeItemE}
            child="a"
            title={"添加"}
            layout={layout}
            columns={dataColumns?dataColumns:columns}
          >
            <Button type="primary" className={styles["gl-table-button"]}>
              <PlusOutlined className={styles["gl-action"]} style={{color: '#fff'}}/>
              添加
            </Button>
          </ModalComponent>
          {selectedRowKeys.length ?
            <Button
              type="primary"
              className={styles["gl-table-button"]}
              onClick={() => {
                data.filter(i => selectedRowKeys.indexOf(parseInt(i.key)) >= 0).map(j => deleteItem(j))
              }}>
              批量删除
            </Button>
            : null}
        </div>
        <Spin spinning={loadingFlush}>
          <Table
            size={density}
            columns={dataColumns?dataColumns:columns}
            dataSource={data}
            rowSelection={rowSelection}
            pagination={{pageSize: 10}}
          />
        </Spin>
      </div>:null}
    </div>
  </div>)
}
export default connect(({dynamicSpace}) => ({dynamicSpace}))(DingApp);
