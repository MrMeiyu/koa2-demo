const mongoose = require('../index')
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
	title: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  },
})

const MovieModel = mongoose.model('Movie', MovieSchema)

module.exports = MovieModel