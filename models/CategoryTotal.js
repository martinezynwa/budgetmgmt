const mongoose = require('mongoose')

const schema = new mongoose.Schema({

  category: {
    type: String,
  },

  total: {
    type: Number,
  },
})

module.exports = mongoose.model('CategoryTotal', schema)
