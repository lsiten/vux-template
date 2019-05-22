<template>
  <div style="height:100%;" class="root-index">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <view-box ref="viewBox" :body-padding-top="isShowNav ? '46px' : '0'" :body-padding-bottom=" isShowBar ? '55px' : '0'">
      <lsiten-header></lsiten-header>
      <transition
      @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
      :name="viewTransition" :css="!!direction">
         <keep-alive  v-if="$route.meta.keepAlive">
          <!-- 需要缓存的视图组件 -->
          <router-view :include="include" class="router-view">
          </router-view>
        </keep-alive>
        <!-- 不需要缓存的视图组件 -->
        <router-view class="router-view" v-if="!$route.meta.keepAlive">
        </router-view>
      </transition>
      <lsiten-footer slot="bottom"></lsiten-footer>
    </view-box>
  </div>
</template>

<script>
import { Loading, ViewBox, TransferDom } from 'vux'
import { mapGetters, mapState } from 'vuex'
import lheader from '../../components/headers/lsiten-header'
import lfooter from '../../components/footers/lsiten-footer'

export default {
  name: 'index',
  data () {
    return {
      entryUrl: document.location.href,
      include: []
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Loading,
    ViewBox,
    'lsiten-header': lheader,
    'lsiten-footer': lfooter
  },
  watch: {
    $route (to, from) {
      // 如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name)
      }
      // 如果 要 form(离开) 的页面是 keepAlive缓存的，
      // 再根据 deepth 来判断是前进还是后退
      // 如果是后退
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        let index = this.include.indexOf(from.name)
        index !== -1 && this.include.splice(index, 1)
      }
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'com_isLoading',
      direction: 'com_dirction',
      isShowNav: 'com_isshow_nav',
      isShowBar: 'com_bar_isshow'
    }),
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready
    }),
    viewTransition () {
      if (!this.direction) return ''
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
    }
  }
}
</script>
<style lang="less" scoped>
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all ease-in 200ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>

