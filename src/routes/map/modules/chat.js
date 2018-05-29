/**
 * Created by Administrator on 2017/1/20.
 */

export default [
    {
        path: '/chat',
        name:'chat',
        component: resolve => require(['views/chat'], resolve)
    },
    {
        path: '/chat/setting',
        name:'chat/setting',
        component: resolve => require(['views/chat/setting'], resolve)
    },
]
