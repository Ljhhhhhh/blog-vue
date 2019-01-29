const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Tag = new Schema({
  name: {
    type: String,
    require: true
  },
  total: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Number,
    default: Date.now()
  }
})

module.exports = mongoose.model('Tag', Tag)