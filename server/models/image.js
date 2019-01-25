const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = new Schema({
  path: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Image', Image)