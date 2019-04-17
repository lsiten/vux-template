// template.js
module.exports = {
  vueTemplate: compoenntName => {
    return `<template>
  <div class="${compoenntName}">
    ${compoenntName}页面
  </div>
</template>
<script>
  export default {
    name: '${compoenntName}'
  }
</script>
<style lang="scss" scoped>
 .${compoenntName} {
 }
</style>`
  }
}
