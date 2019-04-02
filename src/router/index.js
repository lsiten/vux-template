import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      total: 0,
      current_page: 1,
      page_size: 12
    },
    {
      path: '/',
      component: resolve => require(['../pages/root/index.vue'], resolve),
      meta: {title: '自述文件'},
      children: [
        {
          name: 'dashboard',
          path: '/dashboard',
          component: resolve => require(['../pages/home/Dashboard.vue'], resolve),
          meta: {title: 'components.header.home', permission: true}
        },
        {
          name: 'order',
          path: '/order',
          component: resolve => require(['../pages/order/order.vue'], resolve),
          meta: {title: 'components.header.order', permission: true}
        },
        {
          name: 'user',
          path: '/user',
          component: resolve => require(['../pages/user/user.vue'], resolve),
          meta: {title: 'components.header.user', permission: true}
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: resolve => require(['../pages/common/Login.vue'], resolve)
    },
    {
      name: '404',
      path: '/404',
      component: resolve => require(['../pages/common/404.vue'], resolve)
    },
    {
      name: '403',
      path: '/403',
      component: resolve => require(['../pages/common/403.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
