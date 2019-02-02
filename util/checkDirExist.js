const path = require('path')
const fs = require('fs')

function checkDirExist(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

module.exports = checkDirExist
