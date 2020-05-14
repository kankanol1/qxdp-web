let data = [
  {
    key: 0, authority: "管理员", authoritys: [
      'admin',
      'user',
       'doors1', 'doors2', 'doors3',
      'sales1', 'sales2', 'sales3', 'sales4',
       'product1', 'product2', 'product3', 'product4',
       'human1', 'human2', 'human3', 'human4',
       'office1', 'office2', 'office3', 'office4',
      'data',
      'authority']
  },
  {
    key: 1, authority: "企业门户", authoritys: [
      'doors1', 'doors2', 'doors3',
       'office1', 'office2', 'office3', 'office4',
      "authority"]
  },
  {
    key: 2, authority: "销售管理", authoritys: [
      'sales1', 'sales2', 'sales3', 'sales4',
       'office1', 'office2', 'office3', 'office4',
      "authority"]
  },
  {
    key: 3, authority: "生产管理", authoritys: [
       'product1', 'product2', 'product3', 'product4',
       'office1', 'office2', 'office3', 'office4',
      "authority"]
  },
  {
    key: 4, authority: "人事管理", authoritys: [
       'human1', 'human2', 'human3', 'human4',
       'office1', 'office2', 'office3', 'office4',
      "authority"]
  },
  {
    key: 5, authority: "OA一体化", authoritys: [
    'office1', 'office2', 'office3', 'office4',
      "authority"]
  },
];

const getRoles = (req, res) => {
  return res.json({data: data});
};

const getMember = (req, res) => {
  data = data.map(i => (req.query.key === i.key ? payload : i));
  return res.json({data: data});
};
const get = (req, res) => {
  return res.join({});
};

export default {
  'POST /api/sys/roles': getRoles,
  'POST /api/sys/members': getMember,
}
