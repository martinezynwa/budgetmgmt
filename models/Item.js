const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  itemDate: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemCategory: {
    type: Object,

    name: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  itemPrice: {
    type: Object,
    required: true,

    price: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
    },
  },
  itemUpdated: {
    type: Object,

    isUpdated: {
      type: Boolean,
    },
    updateStamp: {
      type: String,
    },
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

module.exports = mongoose.model('Item', schema)
