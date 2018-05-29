/**
 * Created by Administrator on 2017/1/20.
 */

export default [
    {
        path: '/search/friend',
        name:'search/friend',
        component: resolve => require(['views/search/friend'], resolve)
    },
    {
        path: '/search/article',
        name:'search/article',
        component: resolve => require(['views/search/article'], resolve)
    },
    {
        path: '/search/classify/:type',
        name:'search/classify',
        component: resolve => require(['views/search/classify'], resolve)
    },
]

