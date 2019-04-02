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
        <router-view class="router-view"></router-view>
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
      entryUrl: document.location.href
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
  transition: all ease-in 500ms;
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

