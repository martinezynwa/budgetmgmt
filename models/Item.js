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
    type: String,
    required: true,
  },
  itemPrice: {
    type: Object,
    required: true,

    price: {
      type: Number,
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
    updatedBy: {
      type: String,
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
