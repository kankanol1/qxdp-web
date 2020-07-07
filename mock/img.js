let imgList = [
  {
    url:'https://i01piccdn.sogoucdn.com/905894db522971e6',
    lastModified: 1591877022945,
    name: "direwolf.jpg",
    size: 41033,
    type: "image/jpeg",
    uid: "rc-upload-1592210832893-2",
    webkitRelativePath: "",
  },
]
const imgData = (req, res) => {
  imgList = imgList.concat(req.body);//imgList=[...imgList,...req.body]
  res.json({status: 'ok', data: req.body});
}

const imgAvatar = (req, res) => {
  res.json({status: 'ok', data: req.body});
}
const getData = (req, res) => {
  res.json({status: 'ok', data: imgList});
}
const deleteData = (req, res) => {
  imgList.splice(imgList.indexOf(imgList.filter(i=>i.url===req.body.url)[0]), 1);
  res.json({status: 'ok', data: imgList});
}
export default {
  'POST /api/sys/img/avatar': imgAvatar,
  'POST /api/sys/img/upload': imgData,
  'POST /api/sys/img/get': getData,
  'POST /api/sys/img/delete': deleteData,
};
