export default {
  onUpdating: function (a) {
    console.log(a)
  },
  updated () {
    console.log('updated')
  },
  onUpdateFailed (OfflinePluginRuntime) {
    console.log('update failed ')
    setTimeout(() => {
      OfflinePluginRuntime.applyUpdate()
    }, 5000)
  }
}
