// generateView.js`
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))
const { vueTemplate } = require('./templatePage')

const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}
log('请输入要生成的页面路径')
let level = 0
let viewName = ''
let ViewDirectory = ''
let ViewVueName = ''
process.stdin.on('data', async chunk => {
  level >= 2 && errorLog(`参数有错误`)
  level >= 2 && process.stdin.emit('end')
  const inputName = String(chunk).trim().toString()
  level === 0 && log('请输入要生成的页面名称')
  /**
   * 组件目录路径
   */
  level === 0 && (ViewDirectory = resolve('../src/pages', inputName))
  /**
   * vue组件路径
   */
  level === 1 && (ViewVueName = resolve(ViewDirectory, inputName + '.vue'))
  if (level === 1) {
    /**
     * 入口文件路径
     */
    const hasViewDirectory = fs.existsSync(ViewDirectory)
    if (hasViewDirectory) {
      errorLog(`${inputName}组件目录已存在，请重新输入`)
      return
    } else {
      log(`正在生成 View 目录 ${ViewDirectory}`)
      await dotExistDirectoryCreate(ViewDirectory)
      // fs.mkdirSync(ViewDirectory);
    }
    try {
      if (inputName.includes('/')) {
        const inputArr = inputName.split('/')
        viewName = inputArr[inputArr.length - 1]
      } else {
        viewName = inputName
      }
      log(`正在生成 vue 文件 ${ViewVueName}`)
      await generateFile(ViewVueName, vueTemplate(viewName))
      successLog('生成成功')
    } catch (e) {
      errorLog(e.message)
    }
    process.stdin.emit('end')
  }

  level++
})

process.stdin.on('end', () => {
  log('exit')
  process.exit()
})
function dotExistDirectoryCreate (directory) {
  return new Promise((resolve) => {
    mkdirs(directory, function () {
      resolve(true)
    })
  })
}

// 递归创建目录
function mkdirs (directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function () {
      fs.mkdirSync(directory)
      callback()
    })
  }
}
