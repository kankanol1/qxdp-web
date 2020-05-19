/*
*  根据业务需求在需要的地方添加全屏按钮
* @param  elementId
* 传入全屏组件id 默认为document.body
*
* 具体案例前往数据测试data模块下查看  qxd/src/pages/data/index
*
* */

const FullScreenFun = (elementId) => {
  const ele = elementId ? document.getElementById(elementId) : document.body;
  const flag = ele.scrollHeight === window.screen.height && ele.scrollWidth === window.screen.width;
  if (!flag) {
    requestFullScreen(ele);
  } else {
    exitFullscreen();
  }
};

const requestFullScreen = (dom) => {
  if (dom.requestFullscreen) {
    dom.requestFullscreen();
  } else if (dom.mozRequestFullScreen) {
    dom.mozRequestFullScreen();
  } else if (dom.webkitRequestFullScreen) {
    dom.webkitRequestFullScreen();
  }
};


const exitFullscreen = () => {
  var dom = document;
  if (dom.exitFullscreen) {
    dom.exitFullscreen();
  } else if (dom.mozCancelFullScreen) {
    dom.mozCancelFullScreen();
  } else if (dom.webkitCancelFullScreen) {
    dom.webkitCancelFullScreen();
  }
};


//监听作用
const watchFullScreen = () => {
  document.addEventListener(
    "webkitfullscreenchange",
    function () {
    },
    false
  );
};

export default FullScreenFun;
