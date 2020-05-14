import key from "./key";
import Sign from 'jsrsasign';
import JSEncrypt from 'jsencrypt/bin/jsencrypt';
import CryptoJS from 'crypto-js';

//加密
const RSAEncrypt1 = str => {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(key.pks);
  return encrypt.encrypt(str);
};
//解密
const RSADecrypt1 = str => {
  let decrypt = new JSEncrypt();
  decrypt.setPrivateKey(key.privkey);
  return decrypt.decrypt(str);
};

//加密
const RSAEn = (str,pupkey) => {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(pupkey);
  return encrypt.encrypt(str);
};
//解密
const RSADe = (str,privkey) => {
  let decrypt = new JSEncrypt();
  decrypt.setPrivateKey(privkey);
  return decrypt.decrypt(str);
};


const RSAEncrypt = str => {
  let sign = Sign.KEYUTIL.getKey(key.pk);
  return Sign.KJUR.crypto.Cipher.encrypt(str, sign);
};


const keys = "gl20gl20";
const DESEncryptECB = (message) => {
  const keyHex = CryptoJS.enc.Utf8.parse(keys);
  const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
};

//DES  ECB模式解密
const DESDecryptECB = (ciphertext) => {
  const keyHex = CryptoJS.enc.Utf8.parse(keys);
  const decrypted = CryptoJS.DES.decrypt(
    {ciphertext: CryptoJS.enc.Hex.parse(ciphertext)},
    keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
  return decrypted.toString(CryptoJS.enc.Utf8);
};


const stringToHex=(str)=>{
  var val=[];
  for(var i = 0; i < str.length; i++){
    val.push(str.charCodeAt(i).toString(16));
  }
  return val;
};
const stringToHexReverse=(str)=>{
  var val=[];
  for(var i = 0; i < str.length; i++){
    val.push(str.charCodeAt(i).toString(16));
  }
  return val;
};
// 创建DEC 加密用的8字节秘钥
const keyCreate=(len)=>{
  const str ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key='';
  for(let i=0;i<len;i++){
    key+=str[Math.round(Math.random()*(str.length-1))];
  }


  return key;
};

//DESDecodeCBC 加密
const DESEncodeCBC = (rk, key) => {
  const iv = key.split('').reverse().join('');
  const desKey = key.split("").map(it => it.charCodeAt());
  for (let index = desKey.length - 1; index >= 0; index--) {
    if (0 !== (chl & (1 << index))) {
      desKey[index] = ((desKey[index] >>> 2 << 2) | ((desKey[index] & 0B1) << 1) | ((desKey[index] & 0B10) >> 1));
    }
  }
  return CryptoJS.DES.decrypt(
    {ciphertext: CryptoJS.enc.Hex.parse(rk)},
    CryptoJS.enc.Utf8.parse(desKey.map(it => String.fromCharCode(it)).join("")),
    {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
};


//DESDecodeCBC 解密
const DESDecodeCBC = (chl,rk, key) => {
  const iv = key.split('').reverse().join('');
  const desKey = key.split("").map(it => it.charCodeAt());
  for (let index = desKey.length - 1; index >= 0; index--) {
    if (0 !== (chl & (1 << index))) {
      desKey[index] = ((desKey[index] >>> 2 << 2) | ((desKey[index] & 0B1) << 1) | ((desKey[index] & 0B10) >> 1));
    }
  }
  return CryptoJS.DES.decrypt(
    {ciphertext: CryptoJS.enc.Hex.parse(rk)},
    CryptoJS.enc.Utf8.parse(desKey.map(it => String.fromCharCode(it)).join("")),
    {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
};

const decodePw = (chl,rk, key, pd) => {
  const iv = key.split('').reverse().join('');
  const desKey = key.split("").map(it => it.charCodeAt());
  for (let index = desKey.length - 1; index >= 0; index--) {
    if (0 !== (chl & (1 << index))) {
      desKey[index] = ((desKey[index] >>> 2 << 2) | ((desKey[index] & 0B1) << 1) | ((desKey[index] & 0B10) >> 1));
    }
  }
  let rsk = CryptoJS.DES.decrypt(
    {ciphertext: CryptoJS.enc.Hex.parse(rk)},
    CryptoJS.enc.Utf8.parse(desKey.map(it => String.fromCharCode(it)).join("")),
    {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(rsk);
  const pw = Algorithm.stringToHex(encrypt.encrypt(pd)).join('').split('').reverse().join('');
  return pw;
};

const decodeRPw = (chl,rk, key, pd) => {
  const iv = key.split('').reverse().join('');
  const desKey = key.split("").map(it => it.charCodeAt());
  for (let index = desKey.length - 1; index >= 0; index--) {
    if (0 !== (chl & (1 << index))) {
      desKey[index] = ((desKey[index] >>> 2 << 2) | ((desKey[index] & 0B1) << 1) | ((desKey[index] & 0B10) >> 1));
    }
  }
  let rsk = CryptoJS.DES.decrypt(
    {ciphertext: CryptoJS.enc.Hex.parse(rk)},
    CryptoJS.enc.Utf8.parse(desKey.map(it => String.fromCharCode(it)).join("")),
    {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(rsk);
  const pw = Algorithm.stringToHex(encrypt.encrypt(pd)).join('');
  return pw;
};
const Algorithm = {
  RSAEncrypt1,
  RSADecrypt1,
  RSAEncrypt,
  RSAEn,
  RSADe,
  DESEncryptECB,
  DESEncodeCBC,
  DESDecodeCBC,
  stringToHex,
  stringToHexReverse,
  keyCreate,
  decodePw,
  decodeRPw,
};
export default Algorithm;

