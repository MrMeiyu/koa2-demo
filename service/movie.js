const MovieModel = require('../db/models/movie')

module.exports = {
  pageListMovie: query => {
    let user = MovieModel.find(query)
    return new Promise((resolve, reject) => {
      user.exec((err, result) => {
        if (err) {
          console.log(err, 'err')
          reject(false)
        } else {
          resolve(result)
        }
      })
    })
  },
}
