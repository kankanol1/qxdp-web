import Mock from 'mockjs';

let dataSource =Array(100)
  .fill(0, 0, 100)
  .map((item, i) => {
    return Mock.mock({
        "key": i,
        "img": 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        "title":  Mock.mock('@ctitle(3, 8)'),
        "money|100-200": 100,
        "commission|1-50": 20,
        "owner": "张三",
        "deadline": Mock.mock('@now("yyyy-MM-dd mm:hh:ss")'),
        "intro:":Mock.mock('@cparagraph()'),
        "bdeadline":Mock.mock('@now("yyyy-MM-dd mm:hh:ss")'),
        "bmoney|100-200": 100,
        "type|1":["在线","录制视频","面授"],
        "src":"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        "connect|1":["QQ","微信","手机号码"],
        "tel":"12345678901",
        "way|1":["付费开课","15%提成合作"],
      }
    )
  });



const getTableData=(req,res)=>{
  return res.json({dataSource:dataSource.map(i=>{
    // delete i.key;
    // delete i.owner;
    // delete i.intro;
    // delete i.type;
    // delete i.src;
    // delete i.connect;
    // delete i.tel;
    // delete i.way;

    return i;
    })});
}
const queryData=(req,res)=>{
  let data = JSON.parse(JSON.stringify({dataSource})).dataSource.splice((req.query.page-1)*req.query.size,req.query.size)
  return res.json({
    dataSource:data
  });
}

export default {
  'POST /api/get_check_data': getTableData,
  'POST /api/query_check_data': queryData,
}
