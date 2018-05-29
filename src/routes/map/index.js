/**
 * Created by Administrator on 2017/1/5.
 */

import login from './modules/login';
import home from './modules/home';
import ercode from './modules/ercode';
import signature from './modules/signature';
import search from './modules/search';
import dynamic from './modules/dynamic';
import zoo from './modules/zoo';
import chat from './modules/chat';
import friend from './modules/friend';
import redpacket from './modules/redpacket';
import contact from './modules/contact';
import setting from './modules/setting';
import message from './modules/message';

export default [
    ...login,
    ...home,
    ...ercode,
    ...signature,
    ...search,
    ...dynamic,
    ...zoo,
    ...chat,
    ...friend,
    ...redpacket,
    ...contact,
    ...message,
    ...setting,
    //所有引用的路由，放在这句备注之前，否则会出错
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '*', //其他页面，强制跳转到首页
        redirect: '/home'
    },
]
