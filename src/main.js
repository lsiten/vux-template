// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './vuex'
import App from './App'
import vuexI18n from 'vuex-i18n'
import vuxLocales from './locales/all.js'
import { sync } from 'vuex-router-sync'
import { Group, Cell, DatetimePlugin, CloseDialogsPlugin, ConfigPlugin, BusPlugin, LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin } from 'vux'
import * as types from './vuex/types/com'

Vue.config.productionTip = false

Vue.use(vuexI18n.plugin, store)

const finalLocales = {
  'en': vuxLocales['en'],
  'zh-CN': vuxLocales['zh-CN']
}

for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i])
}

/* eslint-disable no-new */
Vue.component('group', Group)
Vue.component('cell', Cell)

Vue.use(LocalePlugin)
const nowLocale = Vue.locale.get()
if (/zh/.test(nowLocale)) {
  Vue.i18n.set('zh-CN')
} else {
  Vue.i18n.set('en')
}

// global VUX config
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX' // global config for VUX, since v2.5.12
})
// plugins
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(BusPlugin)
Vue.use(DatetimePlugin)

Vue.use(CloseDialogsPlugin, router)

sync(store, router)

FastClick.attach(document.body)

// 初始化头部配置
function initHeaderConfig (myrouter) {
  let path = myrouter.path
  let langType = Vue.locale.get()
  store.commit(types.COM_NAV_SHOW, true)
  if (path !== '/' && path !== '/dashboard' && path !== '/login' && path !== '/404' && path !== '/403') {
    store.commit(types.COM_NAV_LEFTOPTIONS, {
      showBack: true,
      backText: finalLocales[langType]['vux.x-header.back_text'],
      preventGoBack: false
    })
  } else {
    store.commit(types.COM_NAV_LEFTOPTIONS, {
      showBack: false,
      backText: finalLocales[langType]['vux.x-header.back_text'],
      preventGoBack: false
    })
  }
  store.commit(types.COM_NAV_RIGHTOPTIONS, {
    showMore: true
  })
  store.commit(types.COM_NAV_TITLE, myrouter.meta.title)
  store.commit(types.COM_NAV_ON_CLICK_MORE, () => {
    store.commit(types.COM_NAV_SHOWMENU, true)
  })
  store.commit(types.COM_NAV_OVER_LEFT_SHOW, false)
  store.commit(types.COM_NAV_ON_LEFT_OVER_CLICK, () => {})
}

// simple history management
const history = window.localStorage
history.clear()
let historyCount = history.getItem('page-count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  endTime = Date.now()
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

router.beforeEach(function (to, from, next) {
  store.commit(types.COM_STATUS, true)
  initHeaderConfig(to)
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit(types.COM_DIRECTION, 'forward')
    } else {
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - endTime) < 377) {
        store.commit(types.COM_DIRECTION, '')
      } else {
        store.commit(types.COM_DIRECTION, 'reverse')
      }
    }
  } else {
    ++historyCount
    history.setItem('page-count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit(types.COM_DIRECTION, 'forward')
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  isPush = false
  store.commit(types.COM_STATUS, false)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
