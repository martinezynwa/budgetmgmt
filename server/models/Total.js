const mongoose = require('mongoose')

const schema = new mongoose.Schema({

  username: {
    type: String,
  },

  total: {
    type: Number,
  },
})

module.exports = mongoose.model('Total', schema)
