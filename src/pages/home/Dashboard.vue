<template>
  <div class="home-index">
    <swiper @on-index-change="onFocusIndexChange" v-model="focusIndex">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in focusData" :key="index">
        <img :src="item.img">
      </swiper-item>
    </swiper>
    <group gutter="0">
      <cell>
        <span slot="title" class="notice-title">
          {{$t('components.home.notice')}}
          <i class="iconfont icon-gonggao"></i>
        </span>
        <marquee>
          <marquee-item v-for="(notice, key) in notices" :key="key">{{ notice.title}}</marquee-item>
        </marquee>
      </cell>
    </group>
  </div>
</template>

<script>
import { Radio, Group, Swiper, SwiperItem, Cell, Marquee, MarqueeItem } from 'vux'

const baseList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg',
  title: '送你一次旅行'
}]
export default {
  name: 'home-index',
  components: {
    Radio,
    Group,
    SwiperItem,
    Swiper,
    Marquee,
    MarqueeItem,
    Cell
  },
  data () {
    return {
      focusData: baseList,
      focusIndex: 0,
      notices: [
        {
          title: '测试1'
        },
        {
          title: '测试2'
        },
        {
          title: '测试3'
        }
      ]
    }
  },
  created () {
    this.$vux.bus && this.$vux.bus.$on('vux:after-view-enter', this.init)
  },
  destroyed () {
    this.$vux.bus && this.$vux.bus.$off('vux:after-view-enter', this.init)
  },
  methods: {
    init () {
      console.log(1)
    },
    onFocusIndexChange: function (lang) {
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-demo-img img {
  width: 100%;
}
.notice-title {
  color: #9f0000;
}
.weui-cells {
  margin-top: 0;
}
</style>

