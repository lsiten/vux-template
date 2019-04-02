import Config from '../config/app.js'

function setHtmlFontSize () {
  const scale = document.documentElement.clientWidth / Config.designSize
  document.documentElement.style.fontSize = Config.baseSize * Math.min(scale, 2) + 'px'
}

// 初始化
setHtmlFontSize()
// 改变窗口大小时重新设置 fontSize
window.onresize = function () {
  setHtmlFontSize()
}
