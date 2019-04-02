/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', false, /\.json$/)
let modules = {}
files.keys().forEach(key => {
  modules = Object.assign({}, modules, files(key))
})

export default modules
