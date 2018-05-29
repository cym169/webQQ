/**
 * Created by Administrator on 2017/3/29.
 */

import { AxiosData } from './api';

const loginIn = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('LOGIN_IN', data, '登录中').then(res=>{
      resolve({
        account: data.account,
        nickname: 'MyName',
        headimg: require('assets/images/common/headimg_mine.jpg'),
      })
    })
  })
}

const sendCode = phone => {
  return new Promise((resolve, reject)=>{
    AxiosData('SEND_CODE', {phone}).then(res=>{
      resolve({
        code: '123456',
      })
    })
  })
}

const checkCode = code => {
  return new Promise((resolve, reject)=>{
    AxiosData('CHECK_CODE', {code}).then(res=>{
      resolve(true)
    })
  })
}

const getPhoneAccount = phone=>{
  return new Promise((resolve, reject)=>{
    AxiosData('PHONE_ACCOUNT', {phone}).then(res=>{
      resolve([{
        account: '1036688015',
        nickname: 'bigZ',
        headimg: require('assets/images/common/headimg_mine.jpg'),
      }])
    })
  })
}

const signNewAccount = data=>{
  return new Promise((resolve, reject)=>{
    AxiosData('SIGN_NEW_ACCOUNT', data).then(res=>{
      resolve({
        account: '1036688015',
      })
    })
  })
}

module.exports = {
  loginIn,
  sendCode,
  checkCode,
  getPhoneAccount,
  signNewAccount,
}
