/**
 * Created by Administrator on 2017/1/20.
 */

import storage from 'servers/localStorage';
import router from '../routes/index';

const getters = {
    getUserInfo: state => {
      let userinfo = state.userInfo && state.userInfo.nickname ? state.userInfo : storage.get('userinfo') || {}
      if(!userinfo.account){
        router.replace({
          name: 'login'
        })
      }
      return userinfo
    },
    getChatInfo: state => {
      let chatinfo = state.chatInfo;
      if(!chatinfo.id){
        router.replace({
          name: 'home'
        })
      }
      return chatinfo
    },
};

export default getters;
