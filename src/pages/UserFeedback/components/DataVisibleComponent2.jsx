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
} from 'bizcharts';
import DataSet from '@antv/data-set';
const { DataView } = DataSet;
const styles ={
  mainTitle:{
    fontSize:14,
    color:"black",
    textAlign:"center",
    marginTop:6,
    marginBottom:0,
  },
}

const DataVisibleComponent = props => {
  const {dataAll} = props;
  const{title,data} = dataAll;
  const dv = new DataView();
  dv.source(data).transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent',
  });
  const cols = {
    percent: {
      formatter: val => {
        val = val * 100 + '%';
        return val;
      },
    },
  };
  function getXY(c, { index: idx = 0, field = 'percent', radius = 0.5 }) {
    const d = c.get('data');
    if (idx > d.length) return;
    const scales = c.get('scales');
    let sum = 0;
    for (let i = 0; i < idx + 1; i++) {
      let val = d[i][field];
      if (i === idx) {
        val = val / 2;
      }
      sum += val;
    }
    const pt = {
      y: scales[field].scale(sum),
      x: radius,
    };
    const coord = c.get('coord');
    let xy = coord.convert(pt);
    return xy;
  }



  return (<div style={{border:'1px solid #000',height:160,margin:"10px"}}>
    <Chart
      data={dv}
      scale={cols}
      height={140}
      padding={[0,50,10,100]}
      forceFit={true}
      onGetG2Instance={c => {
        const xy = getXY(c, { index: 0 });
        c.showTooltip(xy);
      }}
    >
      <h3 className='main-title' style={styles.mainTitle}>
        {title}
      </h3>
      <Coord type="theta" radius={0.85} />
      <Axis name="percent" />
      <Legend
        position="left-center"
      />
      <Tooltip
        //triggerOn='none'
        showTitle={false}
        itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      />
      <Geom
        type="intervalStack"
        position="percent"
        color="item"
        tooltip={[
          'item*percent',
          (item, percent) => {
            percent = percent * 100 + '%';
            return {
              name: item,
              value: percent,
            };
          },
        ]}
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
      >
        {/*<Label
          content="percent"
          formatter={(val, item) => {
            return item.point.item + ': ' + val;
          }}
        />*/}
      </Geom>
    </Chart>
  </div>
);
}
export default DataVisibleComponent;
