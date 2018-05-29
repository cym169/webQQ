/**
 * Created by Administrator on 2017/1/20.
 */

export default [
    {
      path: '/home',
      name:'home',
      redirect: '/home/message/msgs',
      component: resolve => require(['views/home'], resolve),
      children: [
        {
          path: 'message',
          component: resolve => require(['views/message'], resolve),
          children: [
            {
              path: 'msgs',
              component: resolve => require(['views/message/msgs'], resolve)
            },
            {
              path: 'phone',
              component: resolve => require(['views/message/phone'], resolve)
            },
          ]
        },
        {
          path: 'contact',
          component: resolve => require(['views/contact'], resolve),
          children: [
            {
              path: 'list',
              component: resolve => require(['views/contact/list'], resolve)
            },
          ]
        },
        {
          path: 'dynamic',
          component: resolve => require(['views/dynamic'], resolve),
          children: [
            {
              path: 'list',
              component: resolve => require(['views/dynamic/list'], resolve)
            },
          ]
        },
      ]
    },
]

