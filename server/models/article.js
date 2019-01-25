const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Article = new Schema({
  title: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    require: true
  },
  tags: {
    type: Array,
    require: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now()
  },
  del: {
    type: Boolean,
    default: false,
  }
})

module.exports = mongoose.model('Article', Article)