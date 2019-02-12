const UserModel = require('../db/models/user')

module.exports = {
  pageListUser: query => {
    let user = UserModel.find(query)
    return new Promise((resolve, reject) => {
      user.exec((err, result) => {
        if (err) {
          reject(false)
        } else {
          resolve(result)
        }
      })
    })
  },
  findIdUser: id => {
    let user = UserModel.findById(id)
    return new Promise((resolve, reject) => {
      user.exec((err, result) => {
        if (err) {
          reject(false)
        } else {
          resolve(result)
        }
      })
    })
  },
  addUser: params => {
    let user = new UserModel(params)
    return new Promise((resolve, reject) => {
      user.save((err) => {
        console.log(err, 'err')
        if (err) {
          reject(false)
        } else {
          resolve(true)
        }
      })
    })
  },
  updateUser: params => {
    let { id, } = params
    return new Promise((resolve, reject) => {
      UserModel.findByIdAndUpdate(id, { ...params, }, err => {
        if (err) {
          reject(false)
        } else {
          resolve(true)
        }
      })
    })
  },
  deleteUser: id => {
    return new Promise((resolve, reject) => {
      UserModel.findByIdAndRemove(id, err => {
        if (err) {
          reject(false)
        } else {
          resolve(true)
        }
      })
    })
  }
}
