import Vue from 'vue'
import Router from 'vue-router'

// 引入模块路由
let childrenRoutes = []

const routerContext = require.context('./modules', false, /\.js$/)
routerContext.keys().forEach(key => {
  childrenRoutes = [...childrenRoutes, ...(routerContext(key).default || routerContext(key))]
})

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
      children: childrenRoutes
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
