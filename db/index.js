let mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost/test'

const Options = {
  useNewUrlParser: true,
}

mongoose.connect(DB_URL, Options).then(() => {
  console.log('连接到>>>mongodb数据了')
}, err => {
  console.error(err)
})

const db = mongoose.connection

// 连接发生错误的地方
db.on('error', (err) => {
  console.error(`mongodb connection error: ${err}`)
})

// 异常断开
db.on('disconnected', () => {
  console.log('未知错误，断开连接')
})

// 连接成功
db.on('open', function() {
  console.log('connection 连接成功!!!')
})

module.exports = mongoose
