import Mock from 'mockjs';

let dataSource =Array(100)
  .fill(0, 0, 100)
  .map((item, i) => {
    return Mock.mock({
        "key": i+1,
        "img": 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        "title":  Mock.mock('@ctitle(3, 8)'),
        "world":  Mock.mock('@ctitle(3, 8)'),
        "coursec":  [12,3,4],
        "course":  [12,3,4],
        "open":  false,
        "cash":  false,
        "total|23-3434":  2323,


        "owner": "张三",
        "ownerdate":Mock.mock('@now("yyyy-MM-dd mm:hh:ss")'),
        "check": "张三",
        "checkdate": Mock.mock('@now("yyyy-MM-dd mm:hh:ss")'),
        "money|100-200": 100,
        "yjsr|100-200": 100,
        "bmoney|100-200": 100,
        "bdate": Mock.mock('@now("yyyy-MM-dd mm:hh:ss")'),
        "commission|1-50": 20,
        "number|1-50": 20,
        "feedback|1-50": 20,
        "deadline": Mock.mock('@now("yyyy-MM-dd mm:hh:ss")'),
        "intro":Mock.mock('@ctitle(20, 100)'),
        "type|1":["在线","录制视频","面授"],
        "src":"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        "connect|1":["QQ","微信","手机号码"],
        "tel":"12345678901",
        "way|1":["付费开课","15%提成合作"],
      }
    )
  });



const queryData=(req,res)=>{
  return res.json({
    dataSource:[...dataSource].splice((req.query.page-1)*req.query.size,req.query.page*req.query.size)
  });
}
const queryAllData=(req,res)=>{
  return res.json({dataSource});
}
const searchData=(req,res)=>{
  return res.json({
    dataSource:dataSource.filter(i=>i.title.indexOf(req.query.name)>=0)
  });
}
const courses=(req,res)=>{
  return res.json({
    dataSource:[...dataSource].splice((req.query.page-1)*req.query.size,req.query.page*req.query.size)
  });
}
const coursesa=(req,res)=>{
  return res.json({
    dataSource:JSON.parse(JSON.stringify({a:dataSource}))
      .a.splice((req.query.page-1)*req.query.size,req.query.page*req.query.size)
  });
}
export default {
  'POST /api/students/query': queryData,
  'POST /api/students/all': queryAllData,
  'POST /api/students/search': searchData,
  'POST /api/students/courses': courses,
  'POST /api/students/coursesa': coursesa,
}
