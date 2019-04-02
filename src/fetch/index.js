const files = require.context('./modules', false, /\.js$/)
let modules = {}

files.keys().forEach(key => {
  modules = Object.assign({}, modules, files(key).default)
})
export default modules
