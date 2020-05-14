
const os = function (){
  const ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  };
}();

// 获取客户端类型
let clientType = "";

if (os.isAndroid || os.isPhone) {
  clientType="Phone";
} else if (os.isTablet) {
  clientType="Tablet";
} else if(os.isPc) {
  clientType="Pc";
}
const browserName=navigator.appName;



// const appVersion=navigator.appVersion;
var Regx = /^[A-Za-z0-9]*$/;
const userAgent = navigator.userAgent.split('').map(i=>String.fromCharCode(i.charCodeAt()-1)).filter(i=>Regx.test(i)).join('');
const appVersion = navigator.appVersion.split('').map(i=>String.fromCharCode(i.charCodeAt()+1)).filter(i=>Regx.test(i)).join('');
const start = userAgent+clientType+browserName+appVersion;
const item = start.split('').reverse().map(i=>String.fromCharCode(i.charCodeAt()-1)).filter(i=>Regx.test(i)).join('');
let str =item;
while (str.length<128){
  str+=item;
}
// const RID ="qpqwPgdXC4ow21rTt70TvfJMeNoNgOXTbpr1F0E1aakCjrBGoAqyxmUnjYAvvCf74h166jnvhAQk76yD3fYN5TzLufuLuYyHtDTPUQgujWlJ8qGQ7GFW4AVhrFhkWu6t";
const RID =str.substr(0,128);
export default RID;
