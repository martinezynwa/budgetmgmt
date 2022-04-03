const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  type: Object,

  categoryName: {
    type: String,
    required: true,
  },

  createdBy: {
    type: Object,

    username: {
      type: String,
    },
    name: {
      type: String,
    },
    date: {
      type: String,
    },
  },
})

module.exports = mongoose.model('Category', schema)
