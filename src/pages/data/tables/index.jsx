/**
 * Created by lidianzhong on 2020-07-08.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React, {useState} from 'react';
import {Table, Pagination,Select, Checkbox,Input, Button, Space} from 'antd';
import {PlusCircleTwoTone,SearchOutlined, MinusCircleTwoTone} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import styles from './style.less';
import Mock from "mockjs";

const {Option} = Select;
const dataSource = Array(100)
  .fill(0, 0, 100)
  .map((item, i) => {
    return Mock.mock({
      index: i + 1,
      key: i + 1,
      "name|1": ['胡彦斌', "kankan", "kankan1"],
      "money|1-100": 32,
      address: Mock.mock("@city()"),
      address0: Mock.mock("@city()"),
      address1: Mock.mock("@city()"),
      address2: Mock.mock("@city()"),
      address3: Mock.mock("@city()"),
      address4: Mock.mock("@city()"),
      address5: Mock.mock("@city()"),
      address6: Mock.mock("@city()"),
    })
  });

const defaultPageSize = 20;
const TableComponents = () => {

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([1,2,3]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  useState(() => {
    queryFun(1, defaultPageSize);
  }, [])

  const children1=[];
  for (let i = 0; i < 7; i++) {
    children1.push({
      title: '住址' + i, dataIndex: 'address' + i, key: 'address' + i, width: 200,
      ...getColumnSearchProps('address' + i),
    });
  }
  let columns = [
    {
      title: "序号",
      dataIndex: 'index',
      key: 'index',
      width: 100,
      fixed: 'left',
    },
    {
      title: <span>姓名<Checkbox/></span>,
      dataIndex: 'name',
      key: 'name',
      width: 100,
      align: 'center',
      ellipsis: true,
      className: 'kankan',
      // colSpan:1,
      // defaultFilteredValue:'kankan',
      // defaultSortOrder:'ascend',
      // filterDropdownVisible:true,
      // filtered:true,
      filterMultiple: true,
      // filterDropdown:()=><div>filterDropdown</div>,

      onCell: (record, rowIndex) => {
        return {
          onClick: event => {
            // console.log("onCell单击行触发")
          }, // 点击行
          onDoubleClick: event => {
            // console.log("onCell双击行触发")
          },
          onContextMenu: event => {
            // console.log("onCell菜单触发")
          },
          onMouseEnter: event => {
            // console.log("onCell鼠标移入触发")
          }, // 鼠标移入行
          onMouseLeave: event => {
            // console.log("onCell鼠标移出触发")
          },
        };
      },
      // onFilter:(e)=>{},
      // onFilterDropdownVisibleChange:()=>{},
      onHeaderCell: column => {
        return {
          onClick: event => {
            // console.log("onHeaderCell单击行触发")
          }, // 点击行
          onDoubleClick: event => {
            // console.log("onHeaderCell双击行触发")
          },
          onContextMenu: event => {
            // console.log("onHeaderCell菜单触发")
          },
          onMouseEnter: event => {
            // console.log("onHeaderCell鼠标移入触发")
          }, // 鼠标移入行
          onMouseLeave: event => {
            // console.log("onHeaderCell鼠标移出触发")
          },
        };
      },
      filters: [
        {text: 'kankan', value: 'kankan'},
        {text: 'kankan1', value: 'kankan1'},
        {text: '胡彦斌', value: '胡彦斌'},
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: '身价', dataIndex: 'money', key: 'money', width: 100,
      defaultSortOrder: 'ascend',
      sortDirections: ["ascend", "descend"],
      showSorterTooltip: true,
      sorter: (a, b) => a.money - b.money,
      sortOrder: sortedInfo.columnKey === 'money' && sortedInfo.order,

    },
    {
      title: '住址', children: [
        {title: '住址', dataIndex: 'address', key: 'address', width: 200,
          ...getColumnSearchProps("address")
        },
        ...children1,
      ]
    },
  ];

  /**
   * @fun self-define summery.
   * @param currentData
   * @returns {*}
   */
  const onSummary = (currentData) => {
    const a = {
      index: '总计',
      key:"total",
      name: '',
      money: 0,
      address: '',
      address0: "",
      address1: "",
      address2: "",
      address3: "",
      address4: "",
      address5: "",
      address6: "",
    };
    const data = currentData.reduce((total, currentValue, currentIndex, arr) => {
      return {
        ...a,
        money: total.money + currentValue.money,
      }
    }, a)

    return <>
      <Table.Summary.Row>
        <Table.Summary.Cell key={0} index={0}/>
        <Table.Summary.Cell key={1} index={1}/>
        {columns
          .reduce((total,curr,index,arr)=>
            curr.children ?
              total.concat(curr.children) :
              total.concat(curr),[])
          .map((i, j) =>
            <Table.Summary.Cell key={j+2} index={j+2}>
              {data[i.dataIndex]}
            </Table.Summary.Cell>
          )
        }
      </Table.Summary.Row>
    </>
  }


  /**
   * @expandable params.
   * @type {{expandIconColumnIndex: number, expandRowByClick: boolean, onExpand: onExpand, expandIcon: (function({expanded: *, onExpand: *, record?: *}): *), onExpandedRowsChange: onExpandedRowsChange, childrenColumnName: string, defaultExpandAllRows: boolean, expandedRowRender: (function(*, *, *, *): *), rowExpandable: (function(*): boolean), indentSize: number}}
   */
  const expandableSelect = {
    rowExpandable: record => record.name !== 'kankan1',
    childrenColumnName: '展开',
    defaultExpandAllRows: false,
    // defaultExpandedRowKeys: [1],
    expandIcon: ({expanded, onExpand, record}) => {
      //https://codesandbox.io/s/fervent-bird-nuzpr?file=/index.js:1450-1677
      return expanded ? (
        <MinusCircleTwoTone onClick={e => onExpand(record, e)}/>
      ) : (
        <PlusCircleTwoTone onClick={e => onExpand(record, e)}/>
      )
    },
    expandIconColumnIndex: 0,
    // expandedRowKeys: [2,6],
    expandedRowRender: (record, index, indent, expanded) => {
      // console.log(record, index, indent, expanded);
      return <div style={{backgroundColor: 'pink'}}>
        <p>record:{record.name}</p>
        <p>index:{index}</p>
        <p>indent:{indent}</p>
        <p>expanded:{expanded}</p>
      </div>
    },
    indentSize: 20,
    expandRowByClick: true,
    onExpand: (expanded, record) => {
      // console.log(expanded, record);
    },
    onExpandedRowsChange: (expandedRows) => {
      // console.log("expandedRows", expandedRows)
    }

  }

  /**
   * @fun rowSelect params.
   * @type {{selections: ["SELECT_ALL", "SELECT_INVERT", {text: string, key: string, onSelect: function(*): void}, {text: string, key: string, onSelect: function(*): void}, {text: string, key: string, onSelect: function(*): void}], onChange: onChange, onSelectAll: onSelectAll, onSelectInvert: onSelectInvert, selectedRowKeys: number[], columnWidth: number, fixed: boolean, checkStrictly: boolean, preserveSelectedRowKeys: boolean, getCheckboxProps: getCheckboxProps, renderCell: (function(*=, *=, *=, *=): *), type: string}}
   */
  const rowSelection={
    checkStrictly:true,
    columnWidth:100,
    // columnTitle:<span>选择 <Checkbox/></span>,
    fixed:true,
    getCheckboxProps:(record)=>{
      // console.log(record);
    },
    preserveSelectedRowKeys:true,
    renderCell:(checked, record, index, originNode) =>{
      // console.log(checked, record, index, originNode);
      return <span>{index} {originNode}</span>;
    },
    selectedRowKeys,
    // selections:true,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            return index % 2 === 0;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            return index % 2 !== 0;

          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      }, {
        key: 'link',
        text: '模糊匹配',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            return index % 2 !== 0;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
    type:'checkbox',
    onChange:(selectedRowKeys, selectedRows)=>{
      setSelectedRowKeys(selectedRowKeys);
    },
    onSelectAll:(selected, selectedRows, changeRows)=>{},
    onSelectInvert:(selectedRowKeys)=>{}



  }

  /**
   * @fun listen pagination filters sorter changed.
   * @param pagination
   * @param filters
   * @param sorter
   */
  const handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  /**
   * @fun search data.
   * @param page
   * @param size
   */
  function queryFun(page, size) {
    setData([...dataSource].splice((page - 1) * size, size));
  }

  /**
   * @fun  self-define filter.
   * @param dataIndex
   * @returns {{filterDropdown: (function({setSelectedKeys: *, selectedKeys?: *, confirm?: *, clearFilters?: *}): *), filterIcon: (function(*): *), onFilter: (function(*, *): boolean), onFilterDropdownVisibleChange: onFilterDropdownVisibleChange, render: (function(*): *)}}
   */
  function getColumnSearchProps (dataIndex){
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        const set= new Set();
        dataSource.map(i=>{set.add(i[dataIndex])})
        return(
        <div style={{ padding: 8 }}>
          <span style={{fontSize:12,padding:4,display:'block',textAlign:'center',color:'#0189ff'}}>根据业务选择不同匹配模式</span>
          <Input
            value={selectedKeys[0]}
            placeholder={"模糊匹配"}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Select
            placeholder={"精确匹配"}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e? [e] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm,  'address1')}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
            showSearch
          >
            {[...set].map((i,j)=> <Option key={j+1} value={i}>{i}</Option>)}
          </Select>
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              搜索
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              重置
            </Button>
          </Space>
        </div>
      )},
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      // 由于自定义搜索，下面过滤不生效
      onFilter: (value, record) =>record[dataIndex].indexOf(value) === 0,
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          // console.log(searchInput);
          // searchInput.select()
        }
      },
      render: text =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    }
  }

  /**
   *
   * @param selectedKeys
   * @param confirm
   * @param dataIndex
   */
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setData(dataSource.filter((i,j)=>i[dataIndex].toString().includes(selectedKeys[0])).splice(0, defaultPageSize));
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  /**
   *
   * @param clearFilters
   */
  const handleReset = clearFilters => {
    clearFilters();
    setData([...dataSource].splice(0, defaultPageSize));
    setSearchText('');
  };

  return (<div className={styles['table-box']}>
    <Table
      // title={(currentPageData) => titleFunction(currentPageData)}
      dataSource={data}
      columns={columns}
      showHeader={true}
      bordered={true}
      summary={(currentData) => onSummary(currentData)}
      scroll={{x: 800, y: 400}}
      size={'small'}
      onChange={(pagination, filters, sorter) => handleChange(pagination, filters, sorter)}
      // onHeaderRow={(column, index)=> onHeaderRow(column, index)}
      // onRow={(column, index)=> onRow(column, index)}
      onRow={(record, index) => {
        return {
          onClick: event => {
            // console.log("单击行触发")
          }, // 点击行
          onDoubleClick: event => {
            // console.log("双击行触发")
          },
          onContextMenu: event => {
            // console.log("菜单触发")
          },
          onMouseEnter: event => {
            // console.log("鼠标移入触发")
          }, // 鼠标移入行
          onMouseLeave: event => {
            // console.log("鼠标移出触发")
          },
        };
      }}
      onHeaderRow={column => {
        return {
          onClick: () => {
            // console.log("点击表头行触发", column);
          }, // 点击表头行
        };
      }}
      // sortDirections={["ascend","descend"]}
      // showSorterTooltip={true}
      expandable={expandableSelect}
      rowSelection={rowSelection}
      pagination={false}
    />
    <Pagination
      style={{float: 'right'}}
      onChange={(page, pageSize) => {
        queryFun(page, pageSize);
      }}
      onShowSizeChange={(current, size) => {
        queryFun(current, size);
      }}
      total={dataSource.length}
      showSizeChanger
      showQuickJumper
      pageSizeOptions={[10, 20, 50, 100, 200]}
      defaultCurrent={1}
      defaultPageSize={defaultPageSize}
      showTotal={total => `总计 ${total} 条`}
    />
  </div>)
}

export default TableComponents;
