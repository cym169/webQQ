/**
 * Created by Administrator on 2017/4/1.
 */

import { AxiosData }from './api.js';

const chatFriendHistory = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('CHAT_FRIEND_HISTORY', data, '加载中', false).then(res=>{
      let len = Math.round(Math.random()*5+3);
      let data = [];
      for(let i=0; i<len; i++){
        let msg = {};
        Math.random()>.5 ? (msg.message = '一些信息') : (msg.img = Math.random()>.5?require('assets/images/temp/jpg_1.jpg'):require('assets/images/temp/png_1.png'));
        msg.isme = Math.random()>.5;
        data.push(msg);
      }
      resolve({
        info: {
          nickname: '好友名称',
          headimg: require('assets/images/common/headimg_def.jpg'),
          loginsta: '手机在线-WIFI',
          count: 31,
        },
        data,
      })
    })
  })
}

const chatGroupHistory = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('CHAT_GROUP_HISTORY', data, '加载中', false).then(res=>{
      let len = Math.round(Math.random()*5+3);
      let data = [];
      for(let i=0; i<len; i++){
        let msg = {
          nickname: '好友名称',
          level: Math.ceil(Math.random()*8+1),
          lvltxt: '等级',
          headimg: require('assets/images/common/headimg_def.jpg'),
        }
        Math.random()>.5 ? (msg.message = '一些信息') : (msg.img = Math.random()>.5?require('assets/images/temp/jpg_1.jpg'):require('assets/images/temp/png_1.png'));
        let isme = Math.random()>.5;
        msg.isme = isme;
        data.push(msg)
      }
      resolve({
        info: {
          nickname: '群组名称',
          count: 31,
          mylevel: Math.ceil(Math.random()*8+1),
          mylvltxt: '我的等级',
        },
        data,
      })
    })
  })
}

module.exports = {
  chatFriendHistory,
  chatGroupHistory,
}
