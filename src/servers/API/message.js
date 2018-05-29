/**
 * Created by Administrator on 2017/4/1.
 */

import { AxiosData }from './api.js';

const messageList = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('MESSAGE_LIST', data, '加载中', data.tempShow).then(res=>{
      let items = [];
      let len = Math.round(Math.random()*20+5);
      for(let i=0; i<len; i++){
        let type = Math.ceil(Math.random()*2);
        items.push({
          id: 'message_item_'+i,
          type: type,
          title: type == 1 ? '好友名称'+i : '群名称'+i,
          headimg: require('assets/images/common/headimg_def.jpg'),
          time: '上午10:44',
          count: Math.floor(Math.random()*5),
          content: '发送了一些消息过来。'
        })
      }
      resolve({
        bannerAd: Math.random()>.8 ? '' : require('assets/images/message/banner-ad.jpg'),
        items,
      })
    })
  })
}

const phoneList = data=>{
  return new Promise((resolve, reject)=>{
    AxiosData('PHONE_LIST', data, '加载中', data.tempShow).then(res=>{
      let items = [];
      let len = Math.round(Math.random()*10+5);
      for(let i=0; i<len; i++) {
        items.push({
          id: 'phone_item_' + i,
          title: '我的好友' + i,
          icon: 'icon-phone',
          headimg: require('assets/images/common/headimg_mine.jpg'),
          status: Math.floor(Math.random() * 2),
          type: Math.random() > .5 ? 'to' : 'from',
          time: '下午10:30',
          to: {name: ''}
        })
      }
      resolve({
        items,
      })
    })
  })
}

const phoneHistory = data=>{
  return new Promise((resolve, reject)=>{
    AxiosData('PHONE_HISTORY', data).then(res=>{
      let items = [
        {
          date: '2017-04-15',
          list: [
            {time: '上午10:00', type:'to', sta: '已取消'},
            {time: '上午11:00', type:'to', sta: '已取消'},
            {time: '下午5:00', type:'from', sta: '通话50分钟'},
          ]
        },
        {
          date: '2017-04-11',
          list: [
            {time: '上午11:30', type:'to', sta: '通话10分钟'},
            {time: '下午5:00', type:'from', sta: '已取消'},
          ]
        },
        {
          date: '2017-04-10',
          list: [
            {time: '上午5:00', type:'from', sta: '已取消'},
            {time: '上午11:00', type:'to', sta: '已取消'},
            {time: '下午10:00', type:'to', sta: '通话3分钟'},
          ]
        },
      ];
      let info = {
        headimg: require('assets/images/common/headimg_def.jpg'),
        title: '好友名称',
        count: Math.random()>.5 ? Math.round(Math.random()*20) : 0
      }
      resolve({
        info,
        items,
      })
    })
  })
}


module.exports = {
  messageList,
  phoneList,
  phoneHistory,
}
