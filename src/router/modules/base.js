export default [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: resolve => require(['../../pages/home/Dashboard.vue'], resolve),
    meta: {title: 'components.header.home', permission: true}
  },
  {
    name: 'order',
    path: '/order',
    component: resolve => require(['../../pages/order/order.vue'], resolve),
    meta: {title: 'components.header.order', permission: true}
  },
  {
    name: 'user',
    path: '/user',
    component: resolve => require(['../../pages/user/user.vue'], resolve),
    meta: {title: 'components.header.user', permission: true}
  }
]
