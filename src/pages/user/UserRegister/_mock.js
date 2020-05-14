export default {
  'POST  /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
};
/*
export default{
  'POST  /api/register':getRegister,
  // 'POST  /api/general/user/management/register/su':getRegister,
  // 'POST  /api/general/user/management/register/nm':getRegister,
  // 'POST  /api/general/user/management/li/su':getRegister,
  // 'POST  /api/general/user/management/li/nm':getRegister,

}
*/
