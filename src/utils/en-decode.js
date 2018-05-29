/**
 * Created by Administrator on 2017/3/28.
 * 简单数据加密
 */

const base = 'A,Z·VW=Ls|?t%XYBJK}u._Gg<45l#6hi$SkCT3ab+-*c1devM(fjDEFq)[r8m9/^&*HI~!@]yz0N{p>w72QRUoxOPn';

const getIndex = char => {
  return base.indexOf(char)
};
const getChar = code => {
  return String.fromCharCode(code+161)
};
const getCode = char => {
  return char.charCodeAt(0)-161
};

const encodeStr = (str, key) => {
  let rst = '';
  for(let i=0; i<str.length; i++){
    let code = getIndex(str.substr(i, 1))+key+i;
    rst += getChar(code);
  }
  return rst+getChar(key)
};

const encode = str => {
  str = encodeURIComponent(str+'');
  let key = 0;
  for(let i=0; i<str.length; i+=2){
    key += str.charCodeAt(i)
  }
  key = key % 10;
  return encodeStr(str, key)
};

const decodeStr = (str, key) => {
  let rst = '';
  for(let i=0; i<str.length; i++){
    let ind = getCode(str.substr(i, 1))-key-i;
    rst += base[ind]
  }
  return rst
};

const decode = str => {
  let key = getCode(str.substr(-1));
  str = str.substr(0, str.length-1)
  return decodeStr(str, key)
};

module.exports = {
  encode,
  decode,
};
