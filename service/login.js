const UserModel = require('../db/models/user')

module.exports = {
  findOneUser: async query => {
    let data = UserModel.findOne(query)
    return new Promise((resolve, reject) => {
      data.exec((err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}