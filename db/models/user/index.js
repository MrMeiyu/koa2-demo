const mongoose = require('../../index')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  passWord: String,
})

const UserModel = mongoose.model('User', UserSchema)

class UserDb {
  constructor() {
  }

  searchUser(obj = {}) {
    return new Promise((resolve, reject) => {
      UserModel.find(obj, (err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    }) 
  }

  saveUser(obj) {
    const handleData = new UserModel(obj)
    return new Promise((resolve, reject) => {
      handleData.save((err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  }
}

module.exports = new UserDb
