/*__________________________________判断终端设备_____________________________________ */
const browser = {
  versions: function () {
    let u = navigator.userAgent,
      app = navigator.appVersion;
    return {
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

const IsPC = () => {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}


const client = () => {
  const clients = browser.versions;
  if (clients.mobile) {// 移动端
    /*if (clients.android) {//Android
      return 'Android';
    } else if (clients.ios) {//iOS
      return 'iOS';
    } else {
      return 'mobile';
    }*/
    return 'Ph'
  } else if (clients.iPad) {// iPad
    // return 'iPad';
    return 'Ph'
  } else { //PC 端 and 其他
    // return 'PC';
    return 'Br'
  }
}

const clientType = {
  browser,
  IsPC,
  client,
}
export default clientType;
