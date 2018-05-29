/**
 * Created by Administrator on 2017/1/20.
 */

export default [
    {
        path: '/zoo',
        name:'zoo',
        component: resolve => require(['views/zoo'], resolve)
    },
    {
        path: '/zoo/other',
        name:'zoo/other',
        component: resolve => require(['views/zoo/other'], resolve)
    },
    {
        path: '/zoo/more',
        name:'zoo/more',
        component: resolve => require(['views/zoo/more'], resolve)
    },
]

