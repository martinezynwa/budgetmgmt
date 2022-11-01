const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  token: {
    type: String,
  },
  username: {
    type: String,
  },
  registeredAt: {
    type: String,
  },
  darkTheme: {
    type: Boolean,
  },
  totalItems: {
    type: Number,
  },
})

module.exports = mongoose.model('User', schema)
