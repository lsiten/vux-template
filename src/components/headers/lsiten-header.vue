<template>
  <div class="lsiten-header">
    <div v-transfer-dom>
      <actionsheet :menus="menus" :value ="showMenu" @on-after-hide="closeAction" @on-click-menu="changeLocale"></actionsheet>
    </div>
    <x-header
      v-if="isShowNav"
      slot="header"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"
      :left-options="leftOptions"
      :right-options="rightOptions"
      :title="$t(title)"
      @on-click-more="onClickMore">
      <span v-if="overLeftShow" slot="overwrite-left" @click="onLeftOverClick">
        <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      </span>
    </x-header>
  </div>
</template>
<script>
import { XHeader, TransferDom, Actionsheet, Icon } from 'vux'
import { mapGetters } from 'vuex'
export default {
  name: 'lsiten-header',
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet,
    Icon
  },
  computed: {
    ...mapGetters({
      isShowNav: 'com_isshow_nav',
      leftOptions: 'com_nav_leftOptions',
      rightOptions: 'com_nav_rightOptions',
      title: 'com_nav_title',
      onClickMore: 'com_nav_onClickMore',
      overLeftShow: 'com_nav_overLeftShow',
      onLeftOverClick: 'com_nav_onLeftOverClick',
      showMenu: 'com_nav_showmenu'
    })
  },
  data () {
    return {
      menus: {}
    }
  },
  created () {
    this.initLangMenu()
  },
  methods: {
    changeLocale (locale) {
      this.$i18n.set(locale)
      this.$locale.set(locale)
      this.initLangMenu()
    },
    initLangMenu: function () {
      let lang = this.$locale.get()
      this.menus = {
        'language.noop': '<span class="menu-title">' + this.$t('components.header.language.title') + '</span>',
        'zh-CN': this.$t('components.header.language.zh-CN') + (lang === 'zh-CN' ? '<span class="iconfont icon-dui" style="position:absolute;right: 12px;top: 12px;color: #09BE7F;"></span>' : ''),
        'en': this.$t('components.header.language.en') + (lang === 'en' ? '<span class="iconfont icon-dui"  style="position:absolute;right: 12px;top: 12px;color: #09BE7F;"></span>' : '')
      }
    },
    closeAction: function () {
      this.$store.dispatch('com_change_show_menu', false)
    }
  }
}
</script>
<style lang="less">
.menu-title {
  color: #888;
}
</style>

