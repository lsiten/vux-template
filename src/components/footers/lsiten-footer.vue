<template>
  <div class='lsiten-footer'>
    <tabbar class="vux-demo-tabbar" icon-class="vux-center" v-show="isShowBar">
      <tabbar-item :link="{path:'/'}" :selected="route.path === '/dashboard' || route.path === '/'" >
        <span class="iconfont icon-yemian" slot="icon" style="position:relative;top: -2px;"></span>
        <span class="iconfont icon-yemian-selected" slot="icon-active" style="position:relative;top: -2px;"></span>
        <span slot="label">{{$t('components.footer.home')}}</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/order'}" :selected="route.path === '/order'">
        <span class="iconfont icon-order" slot="icon" style="position:relative;top: -2px;"></span>
        <span class="iconfont icon-order-selected" slot="icon-active" style="position:relative;top: -2px;"></span>
        <span slot="label">{{$t('components.footer.order')}}</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/user'}" :selected="route.path === '/user'">
        <span class="iconfont icon-gerenzhongxin-xuanzhong"  slot="icon" style="position:relative;top: -2px;"></span>
        <span class="iconfont icon-gerenzhongxin-xuanzhong-select" slot="icon-active" style="position:relative;top: -2px;"></span>
        <span slot="label">{{$t('components.footer.user')}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'lsiten-footer',
  components: {
    Tabbar,
    TabbarItem
  },
  computed: {
    ...mapGetters({
      isShowBar: 'com_bar_isshow'
    }),
    ...mapState({
      route: state => state.route
    })
  }
}
</script>
<style lang="less" scoped>
  .vux-demo-tabbar {
    .iconfont {
      font-size: 22px;
    }
  }
</style>

