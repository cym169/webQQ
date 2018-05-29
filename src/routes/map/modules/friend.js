/**
 * Created by Administrator on 2017/1/20.
 */

export default [
    {
        path: '/friend/new',
        name:'friend/new',
        component: resolve => require(['views/friend/new'], resolve)
    },
    {
        path: '/friend/newlist',
        name:'friend/newlist',
        component: resolve => require(['views/friend/newlist'], resolve)
    },
    {
        path: '/friend/add',
        name:'friend/add',
        redirect: '/friend/add/person',
        component: resolve => require(['views/friend/add'], resolve),
        children: [
          {
            path: 'person',
            component: resolve => require(['views/friend/person'], resolve),
          },
          {
            path: 'group',
            component: resolve => require(['views/friend/group'], resolve),
          },
          {
            path: 'public',
            component: resolve => require(['views/friend/public'], resolve),
          },
        ]
    },
    {
        path: '/friend/request',
        name:'friend/request',
        component: resolve => require(['views/friend/request'], resolve)
    },
    {
        path: '/friend/mayknow',
        name:'friend/mayknow',
        component: resolve => require(['views/friend/mayknow'], resolve)
    },
]
