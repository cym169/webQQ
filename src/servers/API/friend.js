/**
 * Created by Administrator on 2017/4/1.
 */

import { AxiosData }from './api.js';

const NewFriendList = type => {
  return new Promise((resolve, reject)=>{
    AxiosData('NEW_FRIEND_LIST', {type}).then(res=>{
      let data = {};
      if(type == 'request'){
        data = [
          {id: 1, title: '他的名字1', content:'你还记得我吗？', age: 26, sex: 2, from:'QQ账号查找', headimg: require('assets/images/common/headimg_def.jpg'), sta: 2},
          {id: 2, title: '他的名字2', content:'附近的人？', age: 23, sex: 1, from:'账号查找', headimg: require('assets/images/common/headimg_def.jpg'), sta: 2},
          {id: 3, title: '他的名字3', content:'', age: 26, sex: 2, from:'条件查找', headimg: require('assets/images/common/headimg_def.jpg'), sta: 0},
        ]
      }else if(type == 'recommend'){
        data = [
          {id: 4, title: '他的名字4', content:'你还记得我吗？', age: 26, sex: 2, from:'手机通讯录', headimg: require('assets/images/common/headimg_def.jpg'), sta: 1},
          {id: 5, title: '他的名字5', content:'附近的人？', age: 23, sex: 1, from:'手机通讯录', headimg: require('assets/images/common/headimg_def.jpg'), sta: 1},
          {id: 6, title: '他的名字6', content:'', age: 26, sex: 2, from:'手机通讯录', headimg: require('assets/images/common/headimg_def.jpg'), sta: 1},
        ]
      }else if(type == 'phone') {
        data = {
          count: 55,
          items: [
            {id: 7, title: '名字7', headimg: require('assets/images/common/headimg_def.jpg')},
            {id: 8, title: '他名字8', headimg: require('assets/images/common/headimg_def.jpg')},
            {id: 9, title: '名9', headimg: require('assets/images/common/headimg_def.jpg')},
            {id: 10, title: '他的名字10', headimg: require('assets/images/common/headimg_def.jpg')},
            {id: 11, title: '他的名字11', headimg: require('assets/images/common/headimg_def.jpg')},
          ]
        }
      }else if(type == 'all'){
        data = [
          {id: 1, title: '他的名字1', content:'你还记得我吗？', age: 26, sex: 2, from:'QQ账号查找', headimg: require('assets/images/common/headimg_def.jpg'), sta: 2},
          {id: 2, title: '他的名字2', content:'附近的人？', age: 23, sex: 1, from:'账号查找', headimg: require('assets/images/common/headimg_def.jpg'), sta: 2},
          {id: 3, title: '他的名字3', content:'', age: 26, sex: 2, from:'条件查找', headimg: require('assets/images/common/headimg_def.jpg'), sta: 0},
          {id: 4, title: '他的名字4', content:'你还记得我吗？', age: 26, sex: 2, from:'手机通讯录', headimg: require('assets/images/common/headimg_def.jpg'), sta: 0},
          {id: 5, title: '他的名字5', content:'附近的人？', age: 23, sex: 1, from:'手机通讯录', headimg: require('assets/images/common/headimg_def.jpg'), sta: 0},
          {id: 6, title: '他的名字6', content:'', age: 26, sex: 2, from:'手机通讯录', headimg: require('assets/images/common/headimg_def.jpg'), sta: 0},
          {id: 7, title: '他的名字7', content:'你还记得我吗？', age: 26, sex: 2, from:'手机通讯录', headimg: require('assets/images/common/headimg_def.jpg'), sta: 0},
          {id: 8, title: '他的名字8', content:'附近的人？', age: 23, sex: 1, from:'手机通讯录', headimg: require('assets/images/common/headimg_def.jpg'), sta: 0},
          {id: 9, title: '他的名字9', content:'', age: 26, sex: 2, from:'手机通讯录', headimg: require('assets/images/common/headimg_def.jpg'), sta: 0},
        ]
      }
      resolve(data)
    })
  })
}

const FriendRequest = id => {
  return new Promise((resolve, reject)=>{
    AxiosData('FRIEND_REQUEST', {id}).then(res=>{
      let data = {
        id,
        headimg: require('assets/images/common/headimg_def.jpg'),
        title: 'TA的名字',
        sex: Math.round(Math.random()),
        age: 23,
        tip: '你们有9位共同好友',
        from: '来自通讯录好友',
        sta: Math.round(Math.random()*2)-1
      }
      resolve(data)
    })
  })
}

const FriendMayKnow = type => {
  return new Promise((resolve, reject)=>{
    AxiosData('FRIEND_MAY_KNOW', {type}).then(res=>{
      let data = [
        {id: 1, title: '名字1', count: 30, headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 2, title: '名字2', count: 28, headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 3, title: '名字3', count: 25, headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 4, title: '名字4', count: 15, headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 5, title: '名字5', count: 10, headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 6, title: '名字6', count: 9, headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 7, title: '名字7', count: 8, headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 8, title: '名字8', count: 8, headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 9, title: '名字9', count: 3, headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 10, title: '名字10', count: 3, headimg: require('assets/images/common/headimg_def.jpg')},
      ]
      if(type == 'all'){
        data = [
          {id: 1, title: '名字1', tip: '35位共同好友', sex: 1, age: 25, signature: '他的签名', sta: 1, headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 2, title: '名字2', tip: '35位共同好友', sex: 1, age: 25, signature: '', sta: 1, headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 3, title: '名字3', tip: '35位共同好友', sex: 1, age: 25, signature: '他的签名', sta: 1, headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 4, title: '名字4', tip: '35位共同好友', sex: 1, age: 25, signature: '', sta: 1, headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 5, title: '名字5', tip: '35位共同好友', sex: 1, age: 25, signature: '他的签名', sta: 1, headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 6, title: '名字6', tip: '35位共同好友', sex: 1, age: 25, signature: '他的签名', sta: 1, headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 7, title: '名字7', tip: '35位共同好友', sex: 1, age: 25, signature: '他的签名', sta: 1, headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 8, title: '名字8', tip: '35位共同好友', sex: 1, age: 25, signature: '他的签名', sta: 1, headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 9, title: '名字9', tip: '35位共同好友', sex: 1, age: 25, signature: '他的签名', sta: 1, headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 10, title: '名字10', tip: '35位共同好友', sex: 1, age: 25, signature: '他的签名', sta: 1, headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 11, title: '名字11', tip: '35位共同好友', sex: 1, age: 25, signature: '他的签名', sta: 1, headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 12, title: '名字12', tip: '35位共同好友', sex: 1, age: 25, signature: '他的签名', sta: 1, headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 13, title: '名字13', tip: '35位共同好友', sex: 1, age: 25, signature: '他的签名', sta: 1, headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 14, title: '名字14', tip: '35位共同好友', sex: 1, age: 25, signature: '他的签名', sta: 1, headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 15, title: '名字15', tip: '35位共同好友', sex: 1, age: 25, signature: '他的签名', sta: 1, headimg: require('assets/images/common/headimg_def.jpg')},
        ]
      }
      resolve(data)
    })
  })
}

const FriendInfo = id => {
  return new Promise((resolve, reject)=>{
    AxiosData('FRIEND_INFO', {id}).then(res=>{
      let data = {
        id,
        account: '1036688015',
        headimg: require('assets/images/common/headimg_def.jpg'),
        bgimg: require('assets/images/home/home-operate.jpg'),
        title: 'TA名称',
        nickname: 'TA的昵称',
        sex: Math.round(Math.random()),
        age: 23,
        location: '安徽 合肥',
        signature: '签名或者说说',
        level: 45,
        zan: 35,
        vip: [],
        groupname: '分组名',
        zooImg: {
          count: 10,
          desc: '文字描述',
          imgs:[require('assets/images/temp/jpg_1.jpg'), require('assets/images/temp/png_1.png'), require('assets/images/temp/jpg_1.jpg'), require('assets/images/temp/png_1.png')]
        },
        likes: [
          {
            img: require('assets/images/temp/png_1.png'),
            title: '三生三世',
            tip: '张杰',
            info: '三生三世十里桃花 电视剧原声带'
          },
          {
            img: require('assets/images/temp/jpg_1.jpg'),
            title: '三生三世',
            tip: '张杰',
            info: '三生三世十里桃花 电视剧原声带'
          },
        ]
      }
      resolve(data)
    })
  })
}

const FriendSendInfo = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('FRIEND_SEND_INFO', data).then(res=>{
      resolve(true)
    })
  })
}

const FriendGroupFind = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('FRIEND_GROUP_FIND', data, '加载中', data.isShow).then(res=>{
      let data = {
        imgad: require('assets/images/friend/img_ad_1.jpg'),
        kindItems: [
          {id: 1, title: '生活', icon: 'icon-cup', color: '#fea700'},
          {id: 2, title: '运动', icon: 'icon-ball', color: '#68c34f'},
          {id: 3, title: '交友', icon: 'icon-heart', color: '#fd8484'},
          {id: 4, title: '玩乐', icon: 'icon-icecream', color: '#f68a42'},
          {id: 5, title: '游戏', icon: 'icon-game', color: '#61d0f2'},
          {id: 6, title: '车友', icon: 'icon-car', color: '#59669b'},
          {id: 7, title: '粉丝', icon: 'icon-star', color: '#fed100'},
          {id: 8, title: '行业', icon: 'icon-bag', color: '#578722'},
        ],
        nearItems: [
          {id: 1, title: '群名称1', count: 152, tags: ['70后', 'IT精英'], range: '1.4km', desc: '一些群介绍', headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 2, title: '群名称2', count: 152, tags: [], range: '800m', desc: '一些群介绍', headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 3, title: '群名称3', count: 152, tags: ['IT精英'], range: '2.4km', desc: '一些群介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        ],
        recommendItems: [
          {id: 4, title: '群名称1', count: 152, tags: ['70后', 'IT精英'], range: '1.4km', desc: '一些群介绍', headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 5, title: '群名称2', count: 152, tags: [], range: '800m', desc: '一些群介绍', headimg: require('assets/images/common/headimg_def.jpg')},
          {id: 6, title: '群名称3', count: 152, tags: ['IT精英'], range: '2.4km', desc: '一些群介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        ],
        eventItems: [
          {id:1, title:'11月11号一起环滨湖骑行吧', count: 81, headimg: require('assets/images/temp/jpg_1.jpg')},
          {id:2, title:'一起环滨湖骑行', count: 281, headimg: require('assets/images/temp/jpg_1.jpg')},
        ],
        interestItems: [
          {id:1, title:'射雕英雄传', kind: 5, count: 851381, headimg: require('assets/images/temp/jpg_1.jpg')},
          {id:2, title:'武林外传', kind: 12, count: 283213, headimg: require('assets/images/temp/jpg_1.jpg')},
          {id:3, title:'择天记电视剧', kind: 8, count: 19213, headimg: require('assets/images/temp/jpg_1.jpg')},
          {id:4, title:'鸡毛飞上天', kind: 6, count: 53213, headimg: require('assets/images/temp/jpg_1.jpg')},
        ]
      }
      resolve(data)
    })
  })
}

const FriendPublicFind = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('FRIEND_PUBLIC_FIND', data, '加载中', data.isShow).then(res=>{
      let data = [
        {id: 1, title: '公众名称1', desc: '一些关于公众号的介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 2, title: '公众名称2', desc: '一些关于公众号的介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 3, title: '公众名称3', desc: '一些关于公众号的介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 4, title: '公众名称4', desc: '一些关于公众号的介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 5, title: '公众名称5', desc: '一些关于公众号的介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 6, title: '公众名称6', desc: '一些关于公众号的介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 7, title: '公众名称7', desc: '一些关于公众号的介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 8, title: '公众名称8', desc: '一些关于公众号的介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 9, title: '公众名称9', desc: '一些关于公众号的介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 10, title: '公众名称10', desc: '一些关于公众号的介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 11, title: '公众名称11', desc: '一些关于公众号的介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 12, title: '公众名称12', desc: '一些关于公众号的介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 13, title: '公众名称13', desc: '一些关于公众号的介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 14, title: '公众名称14', desc: '一些关于公众号的介绍', headimg: require('assets/images/common/headimg_def.jpg')},
        {id: 15, title: '公众名称15', desc: '一些关于公众号的介绍', headimg: require('assets/images/common/headimg_def.jpg')},
      ]
      resolve(data)
    })
  })
}



const FriendSearch = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('FRIEND_SEARCH', data).then(res=>{
      Math.random() > .5 ? resolve(false) : resolve('id_1')
    })
  })
}





module.exports = {
  NewFriendList,
  FriendRequest,
  FriendMayKnow,
  FriendInfo,
  FriendSendInfo,
  FriendGroupFind,
  FriendPublicFind,
  FriendSearch,
}
