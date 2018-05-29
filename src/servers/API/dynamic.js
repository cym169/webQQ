/**
 * Created by Administrator on 2017/4/1.
 */

import { AxiosData }from './api.js';

const DynamicList = type => {
  return new Promise((resolve, reject)=>{
    AxiosData('DYNAMIC_LIST', {type}).then(res=>{
      let data = {};
      if(type=='mine'){
        data = {
          headimg: require('assets/images/common/headimg_def.jpg'),
          linkItems: [
            {icon:'icon-game', iconcolor:'#12b7f5', title:'游戏', to:''},
            {icon:'icon-radar', iconcolor:'#fea356', title:'日迹', to:''},
            {icon:'icon-eye', iconcolor:'#89d043', title:'看点', to:''},
            {icon:'icon-jd', iconcolor:'#f05e4b', title:'京东购物', to:''},
            {icon:'icon-read', iconcolor:'#00d1a4', title:'阅读', to:''},
            {icon:'icon-music', iconcolor:'#89d043', title:'音乐', to:''},
            {icon:'icon-video', iconcolor:'#ff6991', title:'直播', to:''},
          ],
          otherItems: [
            {icon:'icon-icecream', iconcolor:'#fea356', title:'吃喝玩乐', to:''},
            {icon:'icon-balloon', iconcolor:'#f05461', title:'同城服务', to:''},
          ]
        }
      }else if(type == 'more'){
        data = [
          {icon:'icon-cartoon', iconcolor:'#fea356', title:'动漫', btn:'开启'},
          {icon:'icon-news', iconcolor:'#12b7f5', title:'腾讯新闻', btn:'开启'},
          {icon:'icon-sport', iconcolor:'#00b4f7', title:'运动', btn:'开启'},
          {icon:'icon-class', iconcolor:'#12b7f5', title:'腾讯课堂', btn:'开启'},
          {icon:'icon-tutor', iconcolor:'#89d043', title:'企鹅辅导', btn:'开启'},
        ]
      }else if(type == 'opened'){
        data = [
          {icon:'icon-game', iconcolor:'#12b7f5', title:'游戏', desc:'一些说明文字，介绍这个类目的功能'},
          {icon:'icon-radar', iconcolor:'#fea356', title:'日迹', desc:'一些说明文字，介绍这个类目的功能'},
          {icon:'icon-eye', iconcolor:'#89d043', title:'看点', desc:'一些说明文字，介绍这个类目的功能'},
          {icon:'icon-jd', iconcolor:'#f05e4b', title:'京东购物', desc:'一些说明文字，介绍这个类目的功能'},
          {icon:'icon-read', iconcolor:'#00d1a4', title:'阅读', desc:'一些说明文字，介绍这个类目的功能'},
          {icon:'icon-music', iconcolor:'#89d043', title:'音乐', desc:'一些说明文字，介绍这个类目的功能'},
          {icon:'icon-video', iconcolor:'#ff6991', title:'直播', desc:'一些说明文字，介绍这个类目的功能'},
          {icon:'icon-icecream', iconcolor:'#fea356', title:'吃喝玩乐', desc:'一些说明文字，介绍这个类目的功能'},
          {icon:'icon-balloon', iconcolor:'#f05461', title:'同城服务', desc:'一些说明文字，介绍这个类目的功能'},
        ]
      }
      resolve(data)
    })
  })
}


module.exports = {
  DynamicList,
}
