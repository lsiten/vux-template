<template>
  <div id="app" style="height:100%;">
    <router-view></router-view>
    <!--vue-ssr-outlet-->
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './assets/base.less';

body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

html, body, * {
  font-size: .18rem;
}
</style>
