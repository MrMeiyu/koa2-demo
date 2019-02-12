const MovieModel = require('../db/models/movie')

module.exports = {
  pageListMovie: query => {
    const { currentPage, pageSize, } = query
    let total;
    let data = []
    let user = MovieModel.find().skip(currentPage).limit(pageSize)
    MovieModel.estimatedDocumentCount((err, count) => {
      if (err) {
        console.log(err, 'err')
      } else {
        total = count
      }
    })
    return new Promise((resolve, reject) => {
      user.exec((err, result) => {
        if (err) {
          console.log(err, 'err')
          reject(false)
        } else {
          data = [
            result,
            total
          ]
          resolve(data)
        }
      })
    })
  },
}
