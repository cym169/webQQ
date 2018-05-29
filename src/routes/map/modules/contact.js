/**
 * Created by Administrator on 2017/1/20.
 */

export default [
    {
        path: '/contact/group',
        name:'contact/group',
        component: resolve => require(['views/contact/group'], resolve)
    },
    {
        path: '/contact/public',
        name:'contact/public',
        component: resolve => require(['views/contact/public'], resolve)
    },
]
