/**
 * Created by Administrator on 2017/1/20.
 */

export default [
    {
        path: '/login',
        name:'login',
        component: resolve => require(['views/login'], resolve)//用这种方法引用组件可实现懒加载
    },
    {
        path: '/check-phone/:type',//验证手机号
        name:'check-phone',
        component: resolve => require(['views/login/check-phone'], resolve)
    },
    {
        path: '/input-code/:phone/:type',//输入验证码
        name:'input-code',
        component: resolve => require(['views/login/input-code'], resolve)
    },
    {
        path: '/phone-used/:phone/',//手机号已用
        name:'phone-used',
        component: resolve => require(['views/login/phone-used'], resolve)
    },
    {
        path: '/new-account/:phone',//注册新账号
        name:'new-account',
        component: resolve => require(['views/login/new-account'], resolve)
    },
    {
        path: '/sign-success/:account',//注册成功
        name:'sign-success',
        component: resolve => require(['views/login/sign-success'], resolve)
    },
]

