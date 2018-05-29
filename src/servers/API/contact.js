/**
 * Created by Administrator on 2017/4/1.
 */

import { AxiosData }from './api.js';

const contactList = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('CONTACT_LIST', data, '加载中', data.tempShow).then(res=>{
      let data = {
        special: [
          {id: 'group_1_1', title: '联系人1', type:'svip', headimg: require('assets/images/common/headimg_def.jpg'), online: '3G在线', content: ''},
          {id: 'group_1_2', title: '联系人2', type:'vip', headimg: require('assets/images/common/headimg_def.jpg'), online: '4G在线', content: '发表了说说'},
          {id: 'group_1_3', title: '联系人3', headimg: require('assets/images/common/headimg_def.jpg'), online: '2G在线', content: '上传了图片', pic: true},
        ],
        often: [
          {id: 'group_2_4', title: '联系人4', headimg: require('assets/images/common/headimg_def.jpg'), online: 'WIFI在线', content: '更新了动态', zoo:true},
          {id: 'group_2_5', title: '联系人5', headimg: require('assets/images/common/headimg_def.jpg'), online: 'WIFI在线', content: ''},
          {id: 'group_2_6', title: '联系人3', headimg: require('assets/images/common/headimg_def.jpg'), online: '2G在线', content: '上传了图片', pic: true, zoo:true},
          {id: 'group_2_7', title: '联系人4', headimg: require('assets/images/common/headimg_def.jpg'), online: '', content: '更新了动态', zoo:true},
        ],
        groups: [
          {title: '分组1', list: [
            {id: 'group_1_1', title: '联系人1', spe:false, type:'svip', headimg: require('assets/images/common/headimg_def.jpg'), online: '3G在线', content: ''},
            {id: 'group_1_2', title: '联系人2', spe:false, type:'vip', headimg: require('assets/images/common/headimg_def.jpg'), online: '4G在线', content: '发表了说说'},
            {id: 'group_1_3', title: '联系人3', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: '2G在线', content: '上传了图片', pic: true},
            {id: 'group_1_4', title: '联系人4', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: 'WIFI在线', content: '更新了动态', zoo:true},
            {id: 'group_1_5', title: '联系人5', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: '', content: '上传了图片', pic: true, zoo:true},
          ]},
          {title: '分组2', list: [
            {id: 'group_2_1', title: '联系人1', spe:false, type:'svip', headimg: require('assets/images/common/headimg_def.jpg'), online: '3G在线', content: ''},
            {id: 'group_2_2', title: '联系人2', spe:false, type:'vip', headimg: require('assets/images/common/headimg_def.jpg'), online: '4G在线', content: '发表了说说'},
            {id: 'group_2_3', title: '联系人3', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: '2G在线', content: '上传了图片', pic: true},
            {id: 'group_2_4', title: '联系人4', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: 'WIFI在线', content: '更新了动态', zoo:true},
            {id: 'group_2_5', title: '联系人5', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: 'WIFI在线', content: ''},
            {id: 'group_2_6', title: '联系人3', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: '2G在线', content: '上传了图片', pic: true, zoo:true},
            {id: 'group_2_7', title: '联系人4', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: '', content: '更新了动态', zoo:true},
            {id: 'group_2_8', title: '联系人5', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: '', content: ''},
          ]},
          {title: '分组3', list: [
            {id: 'group_3_1', title: '联系人1', spe:false, type:'svip', headimg: require('assets/images/common/headimg_def.jpg'), online: '3G在线', content: ''},
            {id: 'group_3_2', title: '联系人2', spe:false, type:'vip', headimg: require('assets/images/common/headimg_def.jpg'), online: '4G在线', content: '发表了说说'},
            {id: 'group_3_3', title: '联系人3', spe:false, type:'vip', headimg: require('assets/images/common/headimg_def.jpg'), online: '2G在线', content: '上传了图片', pic: true, zoo:true},
            {id: 'group_3_4', title: '联系人4', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: 'WIFI在线', content: '更新了动态', zoo:true},
            {id: 'group_2_5', title: '联系人2', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: '4G在线', content: '发表了说说'},
            {id: 'group_2_6', title: '联系人3', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: '2G在线', content: '上传了图片', pic: true, zoo:true},
            {id: 'group_2_7', title: '联系人4', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: 'WIFI在线', content: '更新了动态', zoo:true},
            {id: 'group_2_8', title: '联系人5', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: '2G在线', content: ''},
            {id: 'group_2_9', title: '联系人3', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: '2G在线', content: '上传了图片', pic: true},
            {id: 'group_3_10', title: '联系人5', spe:false, headimg: require('assets/images/common/headimg_def.jpg'), online: '', content: ''},
          ]},
        ],
        cellphone: [
          {id: 'phone_1', title: '手机联系人1', headimg: require('assets/images/common/headimg_def.jpg'), online: '3G在线', content: ''},
          {id: 'phone_2', title: '手机联系人2', headimg: require('assets/images/common/headimg_def.jpg'), online: '4G在线', content: ''},
          {id: 'phone_3', title: '手机联系人3', headimg: require('assets/images/common/headimg_def.jpg'), online: '2G在线', content: ''},
          {id: 'phone_4', title: '手机联系人4', headimg: require('assets/images/common/headimg_def.jpg'), online: 'WIFI在线', content: ''},
          {id: 'phone_5', title: '手机联系人5', headimg: require('assets/images/common/headimg_def.jpg'), online: '', content: ''},
          {id: 'phone_6', title: '手机联系人6', headimg: require('assets/images/common/headimg_def.jpg'), online: '', content: ''},
        ],
        device: [
          {id: 'pc_1', title: '我的电脑', icon: 'icon-pc', online: '在线', content: '无需数据线，手机轻松传送文件到电脑'},
          {title: '我的打印机', icon: 'icon-print', online: '', content: '将手机文件或照片发到电脑连接的打印机'},
          {title: '发现新设备', icon: 'icon-radar', online: '', content: '搜索附近的设备，用QQ轻松连接设备'},
        ],
      };

      resolve(data)
    })
  })
}

const GroupList = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('GROUP_LIST', data, '加载中', false).then(res=>{
      let data = [
        {id: 'group_1', label: '分组1'},
        {id: 'group_2', label: '分组2'},
        {id: 'group_3', label: '分组3'},
        {id: 'group_4', label: '分组4'},
        {id: 'group_5', label: '分组5'},
        {id: 'group_6', label: '分组6'},
        {id: 'group_7', label: '分组7'},
        {id: 'group_8', label: '分组8'},
        {id: 'group_9', label: '分组9'},
        {id: 'group_10', label: '分组10'},
        {id: 'group_11', label: '分组11'},
      ]
      resolve(data)
    })
  })
}

const MyGroupInfo = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('MY_GROUP_INFO', data, '加载中', false).then(res=>{
      let data = {}
      data.groupMine = [
        {id:1, title:'我管理的群1', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:2, title:'我管理的群2', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:3, title:'我管理的群3', headimg: require('assets/images/common/headimg_def.jpg')},
      ]
      data.groupJoin = [
        {id:1, title:'我加入的群1', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:1, title:'我加入的群2', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:1, title:'我加入的群3', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:1, title:'我加入的群4', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:1, title:'我加入的群5', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:1, title:'我加入的群6', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:1, title:'我加入的群7', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:1, title:'我加入的群8', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:1, title:'我加入的群9', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:1, title:'我加入的群10', headimg: require('assets/images/common/headimg_def.jpg')},
      ]
      data.groupAll = [
        {id:1, count:5, title:'多人聊天1', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:1, count:5, title:'多人聊天2', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:1, count:5, title:'多人聊天3', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:1, count:5, title:'多人聊天4', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:1, count:5, title:'多人聊天5', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:1, count:5, title:'多人聊天6', headimg: require('assets/images/common/headimg_def.jpg')},
        {id:1, count:5, title:'多人聊天7', headimg: require('assets/images/common/headimg_def.jpg')},
      ]
      resolve(data)
    })
  })
}

const MyPublicList = data => {
  return new Promise((resolve, reject)=>{
    AxiosData('MY_Public_List', data, '加载中', false).then(res=>{
      let data = {
        a:[
          {id: 1, title: '公众号1', headimg: require('assets/images/temp/jpg_1.jpg')},
          {id: 1, title: '公众号2', headimg: require('assets/images/temp/png_1.png')},
          {id: 1, title: '公众号3', headimg: require('assets/images/temp/jpg_1.jpg')},
        ],
        b:[
          {id: 1, title: '公众号1', headimg: require('assets/images/temp/jpg_1.jpg')},
          {id: 1, title: '公众号2', headimg: require('assets/images/temp/png_1.png')},
          {id: 1, title: '公众号3', headimg: require('assets/images/temp/jpg_1.jpg')},
          {id: 1, title: '公众号2', headimg: require('assets/images/temp/png_1.png')},
          {id: 1, title: '公众号3', headimg: require('assets/images/temp/jpg_1.jpg')},
        ],
        c:[
          {id: 1, title: '公众号1', headimg: require('assets/images/temp/jpg_1.jpg')},
          {id: 1, title: '公众号2', headimg: require('assets/images/temp/png_1.png')},
          {id: 1, title: '公众号2', headimg: require('assets/images/temp/png_1.png')},
          {id: 1, title: '公众号2', headimg: require('assets/images/temp/png_1.png')},
          {id: 1, title: '公众号3', headimg: require('assets/images/temp/jpg_1.jpg')},
        ],
        d:[
          {id: 1, title: '公众号1', headimg: require('assets/images/temp/jpg_1.jpg')},
          {id: 1, title: '公众号1', headimg: require('assets/images/temp/jpg_1.jpg')},
          {id: 1, title: '公众号1', headimg: require('assets/images/temp/jpg_1.jpg')},
          {id: 1, title: '公众号2', headimg: require('assets/images/temp/png_1.png')},
          {id: 1, title: '公众号1', headimg: require('assets/images/temp/jpg_1.jpg')},
          {id: 1, title: '公众号2', headimg: require('assets/images/temp/png_1.png')},
          {id: 1, title: '公众号3', headimg: require('assets/images/temp/jpg_1.jpg')},
        ],
        e:[
          {id: 1, title: '公众号1', headimg: require('assets/images/temp/jpg_1.jpg')},
          {id: 1, title: '公众号1', headimg: require('assets/images/temp/jpg_1.jpg')},
          {id: 1, title: '公众号2', headimg: require('assets/images/temp/png_1.png')},
          {id: 1, title: '公众号3', headimg: require('assets/images/temp/jpg_1.jpg')},
        ],
      }
      resolve(data)
    })
  })
}



module.exports = {
  contactList,
  GroupList,
  MyGroupInfo,
  MyPublicList,
}
