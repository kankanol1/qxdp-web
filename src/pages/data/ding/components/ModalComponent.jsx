/**
 * Created by lidianzhong on 2020-05-09.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React, {useState} from 'react'
import {Modal, Button, Row, Col, Select, DatePicker, Input, InputNumber} from 'antd';
import moment from "moment";

const {Option} = Select;
const dateFormat = 'YYYY-MM-DD';

const ModalComponent = props => {
  let {details, onChangeItem, children, onChangeItemE, columns, title, layout, child} = props;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const formitem={
    "name": '',
    "age": '',
    "world": '',
    "fancy": {swimming: "游泳"},
    "date": moment().format(dateFormat),
  };
  if(title==="添加"){
    details=formitem;
  }

  let row =details;

  // 渲染子节点
  const childNode = (child) => {
    let ele = undefined;
    switch (child) {
      case 'a':
        ele = <a onClick={() => setVisible(true)}>{title}</a>;
        break;
      case 'button':
        ele = <Button type="primary" onClick={() => setVisible(true)}>{title}</Button>;
        break;
      case 'span':
        ele = <span onClick={() => setVisible(true)}>{title}</span>;
        break;
      default:
        ele = <a onClick={() => setVisible(true)}>{title}</a>;
        break;
    }
    return ele;
  }

  // 渲染footer
  const footerArray = (title) => {
    return title === "查看" ? [] : [
      <Button key="back" onClick={() => setVisible(false)}>
        返回
      </Button>,
      <Button key="submit" type="primary" loading={loading} onClick={() => handleOk(row)}>
        提交
      </Button>,
    ]
  }

  // 内容
  const textContenxt = (details, item) => {
    if (title === "查看") {
      if (typeof details[item.dataIndex] === 'object') {
        return details&&details[item.dataIndex]&&Object.values(details[item.dataIndex])[0]||""
      } else {
        return details[item.dataIndex]
      }
    }else if(title === "添加"){
        return addType(item);
    }else {
      return labelType(item);
    }
  }
  const handleOk = (rows) => {
    setLoading(true);

    const res = onChangeItemE(rows);
    if (res.status === 'ok') {
      setLoading(false);
      setVisible(false);
    } else {
      // message.warning("提交失败，请重试！")
      setLoading(false);
      setVisible(false);
    }
  };


  const labelType = item => {
    if (item.valueType === "date") {
      return <div key={item.dataIndex}>
        <DatePicker
          style={{width: '100%'}}
          onChange={(e) => {
            row[item.dataIndex] = moment(e).format(dateFormat);
            onChangeItem(row);
          }}
          allowClear={false}
          value={moment(row[item.dataIndex], dateFormat)}
          format={dateFormat}/>
      </div>;
    } else if (item.valueType === "textArea") {
      return <div key={item.dataIndex}>
        <Input.TextArea
          style={{width: '100%'}}
          value={row[item.dataIndex]}
          onChange={(e) => {
            row[item.dataIndex] = e.target.value;
            onChangeItem(row)
          }}
        />
      </div>;
    } else if (item.valueType === "number") {
      return <div key={item.dataIndex}>
        <InputNumber
          style={{width: '100%'}}
          allowClear={false}
          onChange={(e) => {
            row[item.dataIndex] = e;
            onChangeItem(row)
          }}
          value={row[item.dataIndex]}
        />
      </div>;

    } else if (item.valueType === "text") {
      return <div key={item.dataIndex}>
        <Input
          style={{width: '100%'}}
          allowClear={false}
          onChange={(e) => {
            row[item.dataIndex] = e.target.value;
            onChangeItem(row)
          }}
          value={row[item.dataIndex]}
        />
      </div>;

    } else if (item.valueType === "select") {
      const options = columns.filter(i => i.valueType === "select")[0]["options"];
      return <div key={item.dataIndex} style={{backgroundColor: '#fff'}}>
        {<Select
          style={{width: '100%'}}
          showSearch
          defaultValue={Object.values(details[item.dataIndex])}
          onChange={(value, option) => {
            if (value && options.filter(f => f[option.key] === value)[0]) {
              let data = {};
              data[option.key] = option.value;
              row[item.dataIndex] = data;
              console.log(row);
              onChangeItem(row);
            }
          }}
          filterOption={true}
          showArrow={false}
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
    } else {
      return <div key={item.dataIndex}>
        <Input
          style={{width: '100%'}}
          allowClear={false}
          onChange={(e) => {
            row[item.dataIndex] = e.target.value;
            onChangeItem(row)
          }}
          value={row[item.dataIndex]}
        />
      </div>;
    }
  }

  const addType = item => {
    if (item.valueType === "date") {
      return <div key={item.dataIndex}>
        <DatePicker
          style={{width: '100%'}}
          onChange={(e) => {
            row[item.dataIndex] = moment(e).format(dateFormat);
          }}
          allowClear={false}
          defaultValue={moment(row[item.dataIndex], dateFormat)}
          format={dateFormat}/>
      </div>;
    } else if (item.valueType === "textArea") {
      return <div key={item.dataIndex}>
        <Input.TextArea
          style={{width: '100%'}}
          defaultValue={row[item.dataIndex]}
          onChange={(e) => {
            row[item.dataIndex] = e.target.value;
          }}
        />
      </div>;
    } else if (item.valueType === "number") {
      return <div key={item.dataIndex}>
        <InputNumber
          style={{width: '100%'}}
          allowClear={false}
          onChange={(e) => {
            row[item.dataIndex] = e;
          }}
          defaultValue={row[item.dataIndex]}
        />
      </div>;

    } else if (item.valueType === "text") {
      return <div key={item.dataIndex}>
        <Input
          style={{width: '100%'}}
          allowClear={false}
          onChange={(e) => {
            row[item.dataIndex] = e.target.value;
          }}
          defaultValue={row[item.dataIndex]}
        />
      </div>;

    } else if (item.valueType === "select") {
      const options = columns.filter(i => i.valueType === "select")[0]["options"];
      return <div key={item.dataIndex} style={{backgroundColor: '#fff'}}>
        {<Select
          style={{width: '100%'}}
          showSearch
          defaultValue={Object.values(details[item.dataIndex])}
          onChange={(value, option) => {
            if (value && options.filter(f => f[option.key] === value)[0]) {
              let data = {};
              data[option.key] = option.value;
              row[item.dataIndex] = data;
            }
          }}
          filterOption={true}
          showArrow={false}
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
    } else {
      return <div key={item.dataIndex}>
        <Input
          style={{width: '100%'}}
          allowClear={false}
          onChange={(e) => {
            row[item.dataIndex] = e.target.value;
          }}
          defaultValue={row[item.dataIndex]}
        />
      </div>;
    }
  }
  return (
    <>
      {<a onClick={() => setVisible(true)}>
        {children}
      </a>}
      <Modal
        visible={visible}
        title={title}
        onOk={() => handleOk(row)}
        onCancel={() => setVisible(false)}
        footer={footerArray(title)}
      >
        {columns && details && columns
          .filter(j => j.valueType !== "option")
          .map((item, i) => <Row key={i} style={{marginTop: 10}}>
            <Col span={layout[0]}>{item.title}:</Col>
            <Col span={layout[1]}>{textContenxt(details, item)}</Col>
          </Row>)}
      </Modal>
    </>
  );
}

// export default connect(({dynamicSpace})=>({dynamicSpace}))(ModalComponent);
export default ModalComponent;
