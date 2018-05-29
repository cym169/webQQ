/**
 * Created by Administrator on 2017/4/1.
 */

import { AxiosData }from './api.js';

const ZooFriendInfo = id => {
  return new Promise((resolve, reject)=>{
    AxiosData('ZOO_FRIEND_INFO', {id}).then(res=>{
      let data = {
        id,
        headimg: require('assets/images/common/headimg_mine.jpg'),
        bgimg: require('assets/images/zoo/bg_1.jpg'),
        title: 'TA名称',
        nickname: 'TA的昵称',
      }
      resolve(data)
    })
  })
}

const ZooMessages = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('ZOO_FRIEND_INFO', data, '加载中', false).then(res=>{
      let data = [
        {
          id: 1,
          headimg: require('assets/images/temp/jpg_1.jpg'),
          title: 'TA的名字',
          date: '今天12:52',
          message: '他发表的一些说说内容',
          imgs: [require('assets/images/temp/jpg_1.jpg'), require('assets/images/temp/png_1.png')],
          phone: 'iPhone 6s Plus',
          view: 0,
          liked: false,//我是否点赞
          likes: [
            {id: 1, nickname:'昵称1'},
            {id: 2, nickname:'昵称2'},
            {id: 3, nickname:'昵称3'},
            {id: 4, nickname:'昵称4'},
            {id: 5, nickname:'昵称5'},
            {id: 6, nickname:'昵称6'},
            {id: 7, nickname:'昵称7'},
            {id: 8, nickname:'昵称8'},
            {id: 9, nickname:'昵称9'}
          ],
          commont: [
            {
              names: ['昵称1'],
              message: '发表的一些评论'
            },
            {
              names: ['昵称1', '昵称2'],
              message: '发表的一些评论'
            },
            {
              names: ['昵称2', '昵称1'],
              message: '发表的一些评论发表的一些评论发表的一些评论发表的一些评论发表的一些评论'
            },
            {
              names: ['昵称3'],
              message: '发表的一些评论'
            },
          ]
        },
        {
          id: 1,
          headimg: require('assets/images/temp/png_1.png'),
          title: 'TA的名字',
          date: '今天12:52',
          message: '他发表的一些说说内容',
          phone: 'iPhone 6s Plus',
          view: 25,
          liked: false,//我是否点赞
          likes: [
            {id: 1, nickname:'昵称1'},
            {id: 2, nickname:'昵称2'},
            {id: 3, nickname:'昵称3'},
            {id: 7, nickname:'昵称7'},
            {id: 8, nickname:'昵称8'},
            {id: 9, nickname:'昵称9'}
          ],
          commont: [
            {
              names: ['昵称1'],
              message: '发表的一些评论'
            },
            {
              names: ['昵称1', '昵称2'],
              message: '发表的一些评论'
            },
            {
              names: ['昵称3'],
              message: '发表的一些评论'
            },
          ]
        },
        {
          id: 1,
          headimg: require('assets/images/temp/png_1.png'),
          title: 'TA的名字',
          date: '今天12:52',
          message: '他发表的一些说说内容',
          imgs: [require('assets/images/temp/jpg_1.jpg'), require('assets/images/temp/png_1.png'), require('assets/images/temp/png_1.png'), require('assets/images/temp/jpg_1.jpg'), require('assets/images/temp/png_1.png'), require('assets/images/temp/jpg_1.jpg'), require('assets/images/temp/png_1.png'), require('assets/images/temp/png_1.png'), require('assets/images/temp/jpg_1.jpg')],
          phone: 'iPhone 6s Plus',
          view: 265,
          liked: true,//我是否点赞
          likes: [
            {id: 1, nickname:'昵称1'},
            {id: 8, nickname:'昵称8'},
            {id: 9, nickname:'昵称9'},
          ],
          commont: [
            {
              names: ['昵称1'],
              message: '发表的一些评论'
            },
            {
              names: ['昵称1', '昵称2'],
              message: '发表的一些评论'
            },
            {
              names: ['昵称2', '昵称1'],
              message: '发表的一些评论发表的一些评论发表的一些评论发表的一些评论发表的一些评论'
            },
            {
              names: ['昵称1', '昵称2'],
              message: '发表的一些评论'
            },
            {
              names: ['昵称2', '昵称1'],
              message: '发表的一些评论发表的一些评论发表的一些评论发表的一些评论发表的一些评论'
            },
            {
              names: ['昵称3'],
              message: '发表的一些评论'
            },
          ]
        },
      ]
      resolve(data)
    })
  })
}

//品论
const ZooMsgComment = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('ZOO_MSG_COMMENT', data).then(res=>{
      resolve(true)
    })
  })
}

//转发
const ZooMsgSend = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('ZOO_MSG_SEND', data).then(res=>{
      resolve(true)
    })
  })
}
//发红包
const ZooSendRedpacket = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('ZOO_SEND_REDPACKET', data).then(res=>{
      resolve(true)
    })
  })
}


module.exports = {
  ZooFriendInfo,
  ZooMessages,
  ZooMsgComment,
  ZooMsgSend,
  ZooSendRedpacket,
}
