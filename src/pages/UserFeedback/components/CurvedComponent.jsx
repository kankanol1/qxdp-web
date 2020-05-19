/**
 * Created by lidianzhong on 2020-05-18.
 * To: More pain, more gain.
 */

import React from "react";
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
  Util
} from "bizcharts";

const styles ={
  mainTitle:{
    fontSize:14,
    color:"black",
    textAlign:"center",
    marginTop:6,
    marginBottom:0,
  },
}
const  CurvedComponent =props=> {
    const data = [
      {
        month: "Jan",
        city: "用户",
        number: 7
      },
      {
        month: "Jan",
        city: "人员",
        number: 39
      },
      {
        month: "Feb",
        city: "用户",
        number: 69
      },
      {
        month: "Feb",
        city: "人员",
        number: 42
      },
      {
        month: "Mar",
        city: "用户",
        number: 95
      },
      {
        month: "Mar",
        city: "人员",
        number: 57
      },
      {
        month: "Apr",
        city: "用户",
        number: 145
      },
      {
        month: "Apr",
        city: "人员",
        number: 85
      },
      {
        month: "May",
        city: "用户",
        number: 184
      },
      {
        month: "May",
        city: "人员",
        number: 119
      },
      {
        month: "Jun",
        city: "用户",
        number: 215
      },
      {
        month: "Jun",
        city: "人员",
        number: 152
      },
      {
        month: "Jul",
        city: "用户",
        number: 252
      },
      {
        month: "Jul",
        city: "人员",
        number: 17
      },
      {
        month: "Aug",
        city: "用户",
        number: 265
      },
      {
        month: "Aug",
        city: "人员",
        number: 166
      },
      {
        month: "Sep",
        city: "用户",
        number: 233
      },
      {
        month: "Sep",
        city: "人员",
        number: 142
      },
      {
        month: "Oct",
        city: "用户",
        number: 183
      },
      {
        month: "Oct",
        city: "人员",
        number: 103
      },
      {
        month: "Nov",
        city: "用户",
        number: 139
      },
      {
        month: "Nov",
        city: "人员",
        number: 66
      },
      {
        month: "Dec",
        city: "用户",
        number: 96
      },
      {
        month: "Dec",
        city: "人员",
        number: 40
      }
    ];
    const cols = {
      month: {
        range: [0, 1]
      }
    };
    return (
      <div style={{border:"1px solid #000",margin:"10px 10px 0 20px"}}>
        <Chart height={220} data={data} scale={cols} forceFit borded={true}>
          <h3 className='main-title' style={styles.mainTitle}>
            用户增长曲线
          </h3>
          <Legend />
          <Axis name="month" />
          <Axis
            name="number"
            label={{
              formatter: val => `${val}人`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="month*number"
            size={2}
            color={"city"}
            shape={"smooth"}
          />
          <Geom
            type="point"
            position="month*number"
            size={4}
            shape={"circle"}
            color={"city"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
}


export default CurvedComponent;
