/**
 * Created by Administrator on 2017/4/1.
 */

import { AxiosData }from './api.js';

const getSignatureList = type => {
  return new Promise((resolve, reject)=>{
    AxiosData('SIGNATURE_LIST', {type}).then(res=>{
      let list = [],
        len = Math.round(Math.random()*10+5);
      let defKind = ['', 'vip', 'svip'],
        defTitle = ['默认模板', '美女与野兽', '记仇', '失落之城', '阿狸小幸运'],
        defImg = [require('assets/images/signature/skin_0.png'),
          require('assets/images/signature/skin_1.png'),
          require('assets/images/signature/skin_2.png'),
          require('assets/images/signature/skin_3.png'),
          require('assets/images/signature/skin_4.png')
        ];
      for(let i=0; i<len; i++){
        let ind = Math.floor(Math.random()*5);
        list.push({
          id: type+'_'+i,
          kind: defKind[ind%3],
          title: defTitle[ind],
          img: defImg[ind]
        })
      }
      resolve(list)
    })
  })
}

const saveSignature = data=>{
  return new Promise((resolve, reject)=>{
    AxiosData('SIGNATURE_SAVE', data).then(res=>{
      resolve(true)
    })
  })
}

module.exports = {
  getSignatureList,
  saveSignature,
}
