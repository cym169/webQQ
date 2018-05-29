/**
 * Created by Administrator on 2017/1/6.
 */

import { encode, decode } from 'utils/en-decode';
import storage from './localStorage';

const NOOP = () => {};

//添加账号列表
const addAccount = (account, password, nickname, headimg)=>{
  let items = storage.get('accountlist') || [];
  account = encode(account);
  password = encode(password);
  headimg = headimg || require('assets/images/common/headimg_def.jpg');
  nickname = nickname || 'no name';
  let isIn = false;
  for(let i=0; i<items.length; i++){
    if(items[i].account == account){
      isIn = true
    }
  }
  !isIn && items.unshift({
    account, password, headimg, nickname
  })
  storage.set('accountlist', items, 60*24*31)//保存一个月
};
//删除账号列表
const delAccount = (account)=>{
  let items = storage.get('accountlist') || [];
  account = encode(account);
  for(let i=0; i<items.length; i++){
    if(items[i].account == account){
      items.splice(i, 1);
      break;
    }
  }
  storage.set('accountlist', items, 60*24*31)//保存一个月
};
//获取账号列表
const getAccountList = ()=>{
  let items = storage.get('accountlist') || [];
  for(let key in items){
    items[key].account = decode(items[key].account)
    items[key].password = decode(items[key].password)
  }
  return items
};


//添加账号信息
const addAccountHistory = (account, data)=>{
  account = encode(account);
  storage.set(account, data, 60*24*31)//保存一个月
};
//删除账号信息
const delAccountHistory = (account)=>{
  account = encode(account);
  storage.remove(account)
};
//获取账号信息（聊天记录）
const getAccountHistory = (account)=>{
  account = encode(account);
  let info = storage.get(account)
  return info
};

module.exports = {
  NOOP,
  AccountList: {
    add: addAccount,
    del: delAccount,
    get: getAccountList,
  },
  AccountHistory: {
    add: addAccountHistory,
    del: delAccountHistory,
    get: getAccountHistory,
  },
}

