const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = new Schema({
  account: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
})

module.exports = mongoose.model('User', User)