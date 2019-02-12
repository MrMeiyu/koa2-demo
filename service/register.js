const UserModel = require('../db/models/user')

module.exports = {
  registerUser: async params => {
    let user = new UserModel(params)
    console.log(user, 'user')
    return new Promise((resolve, reject) => {
      user.save((err,) => {
        console.log(err, 'err')
        if (err) {
          reject(false)
        } else {
          resolve(true)
        }
      })
    })
  }
}
