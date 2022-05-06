const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },

  importance: {
    type: Number,
    required: true,
  },

  defaultCategory: {
    type: Boolean,
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
