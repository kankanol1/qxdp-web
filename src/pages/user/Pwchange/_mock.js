const passstart = (req, res) => {
  return res.json({
    "status": 20001,
    "msg": "查询成功.",
    "data": {
      "rk": "424a3bf932792eee1bbd4076bfea2264424a3bf932792eee1bbd4076bfea2264424a3bf932792eee1bbd4076bfea2264",
      "tid": 1582701988100
    }
  });
}
const verification = (req, res) => {
  return res.json({
    "status": 20001,
    "msg": "查询成功.",
    "data": {
      "tid": 1582701988100,// # 本地毫秒级时间戳. 计算规则: var tid = new Date().getTime()
      "ugs": true,// # 修改状态, false: 修改失败, true: 修改成功.
      "un": "gl2020"// # 用户登录或注册名称[姓名拼音|手机号码|英文昵称等].
    }
  });
}


export default {
  // 'POST /api/general/user/mt/mm/rs/su': passstart,
  // 'POST /api/general/user/mt/mm/rs/nm': verification,
}
