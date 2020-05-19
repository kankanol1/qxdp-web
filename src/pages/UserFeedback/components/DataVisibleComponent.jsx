/**
 * Created by lidianzhong on 2020-05-18.
 * To: More pain, more gain.
 */

import React from 'react';
import {Row, Col,Card} from 'antd';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from "bizcharts";
const data = [
  { name: 'IE', value: 56.33 },
  { name: 'Chrome', value: 24.03 },
  { name: 'Firefox', value: 10.38 },
  { name: 'Safari', value: 4.77 },
  { name: 'Opera', value: 0.91 },
  { name: 'Unknown', value: 0.2 },
];
const DataVisibleComponent = props => {
  return (
    <div style={{padding: "0px 18px"}}>
      <Card headStyle={{height: "40px"}} title="用户分享" bordered={true}>
        <Row>
          <Col span={10}>
            <a>一次50（人）</a><br/>
            <a>多次20（人）</a><br/>
            <span>总用户：100（人）</span>
          </Col>
          <Col span={14}>
            <Chart
              data={data}
              width={200}
              height={200}
              onIntervalClick={ev => {
                const data = ev.data;
                if (data) {
                  const name = data._origin['name'];
                  window.open('http://www.baidu.com/s?wd=' + name);
                }
              }}
            >
              <Coord type="theta"/>
              <Tooltip showTitle={true} />
              <Geom
                type="intervalStack"
                position="value"
                color="name"
              >
                {/* <Label content="name" /> */}
              </Geom>
            </Chart>
          </Col>
        </Row>
      </Card>

    </div>
  )
}
export default DataVisibleComponent;
