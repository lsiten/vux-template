import api from '../../fetch/modules/com'
import * as types from '../types/com'
const state = {
  loadStatus: false,
  // dirction: ['push', 'go', 'replace', 'forward', 'back']
  dirction: 'forward',
  // 头部配置
  headerConfig: {
    isShowNav: true,
    leftOptions: {
    },
    rightOptions: {
    },
    title: 'lsiten',
    onClickMore: () => {},
    overLeftShow: true,
    onLeftOverClick: () => {},
    showMenu: false
  },
  // footer show
  footerConfig: {
    isShowBar: true
  }
}

const getters = {
  com_isLoading: state => state.loadStatus,
  com_dirction: state => state.dirction,
  com_isshow_nav: state => state.headerConfig.isShowNav,
  com_nav_leftOptions: state => state.headerConfig.leftOptions,
  com_nav_rightOptions: state => state.headerConfig.rightOptions,
  com_nav_title: state => state.headerConfig.title,
  com_nav_onClickMore: state => state.headerConfig.onClickMore,
  com_nav_overLeftShow: state => state.headerConfig.overLeftShow,
  com_nav_onLeftOverClick: state => state.headerConfig.onLeftOverClick,
  com_nav_showmenu: state => state.headerConfig.showMenu,
  com_bar_isshow: state => state.footerConfig.isShowBar
}

const mutations = {
  // 更改load状态
  [types.COM_STATUS] (state, status) {
    state.loadStatus = status
  },
  // 更改load状态
  [types.COM_NAV_SHOWMENU] (state, status) {
    state.headerConfig.showMenu = status
  },
  // 更改前进方向
  [types.COM_DIRECTION] (state, dirction) {
    state.dirction = dirction
  },
  // 更改header显示状态
  [types.COM_NAV_SHOW] (state, status) {
    state.headerConfig.isShowNav = status
  },
  // 更改header的left配置
  [types.COM_NAV_LEFTOPTIONS] (state, left) {
    state.headerConfig.leftOptions = left
  },
  // 更改header的right配置
  [types.COM_NAV_RIGHTOPTIONS] (state, right) {
    state.headerConfig.rightOptions = right
  },
  // 更改header的title
  [types.COM_NAV_TITLE] (state, title) {
    state.headerConfig.title = title
  },
  // 更改header的点击更多按钮
  [types.COM_NAV_ON_CLICK_MORE] (state, click) {
    state.headerConfig.onClickMore = click
  },
  // 更改header的左边over
  [types.COM_NAV_OVER_LEFT_SHOW] (state, status) {
    state.headerConfig.overLeftShow = status
  },
  // 更改header的左边over点击事件
  [types.COM_NAV_ON_LEFT_OVER_CLICK] (state, click) {
    state.headerConfig.onLeftOverClick = click
  },
  // 更改header显示状态
  [types.COM_BAR_SHOW] (state, status) {
    state.footerConfig.isShowBar = status
  }
}

const actions = {
  com_get_img_token ({ commit }, param) {
    return new Promise((resolve, reject) => {
      api.getSignature(param).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 设置加载状态
  com_set_loading_status ({ commit }, status) {
    commit(types.COM_STATUS, status)
  },
  // 设置加载状态
  com_set_direction ({ commit }, dirction) {
    commit(types.COM_DIRECTION, dirction)
  },
  // 设置菜单项
  com_change_show_menu ({ commit }, status) {
    commit(types.COM_NAV_SHOWMENU, status)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
