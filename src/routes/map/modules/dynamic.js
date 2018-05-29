/**
 * Created by Administrator on 2017/1/20.
 */

export default [
    {
        path: '/dynamic/more',
        name:'dynamic/more',
        component: resolve => require(['views/dynamic/more'], resolve)
    },
    {
        path: '/dynamic/opened',
        name:'dynamic/opened',
        component: resolve => require(['views/dynamic/opened'], resolve)
    },
    {
        path: '/dynamic/detail',
        name:'dynamic/detail',
        component: resolve => require(['views/dynamic/detail'], resolve)
    },
]

