const UserModel = require('../db/models/user')

module.exports = {
  pageListUser: async query => {
    return await UserModel.find(query, (err, result) => {
      if (err) {
        return []
      } else {
        return result
      }
    })
  },
  addUser: async user => {
    return await user.save()
  }
}
