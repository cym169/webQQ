/**
 * Created by Administrator on 2017/1/20.
 */

import * as types from './types';
import storage from 'servers/localStorage';

const mutations = {
    //更新用户信息
    [types.UPDATE_USERINFO](state, data){
      let userinfo = storage.get('userinfo') || {};
      state.userInfo = Object.assign(userinfo, state.userInfo, data)
      storage.set('userinfo', state.userInfo, 30)
    },
    //更新聊天窗口信息
    [types.UPDATE_CHATINFO](state, data){
      let chatInfo = storage.get('chatinfo') || {};
      state.chatInfo = Object.assign(chatInfo, state.chatInfo, data)
    },
}

export default mutations;

