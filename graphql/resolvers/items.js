const { checkAuthorization } = require('../../util/auth')
const { UserInputError } = require('apollo-server')
const dayjs = require('dayjs')
const Item = require('../../models/Item')

const { validateItemInput } = require('../../util/validators')

const itemsResolvers = {
  Query: {
    getItems: async () => {
      try {
        const items = await Item.find({})
        return items
      } catch (err) {
        throw new Error(err)
      }
    },
    getSingleItem: async (_, args) => {
      try {
        const item = await Item.findById(args.itemID)
        return item
      } catch (err) {
        throw new Error('Item not found')
      }
    },
    getCurrentMonth: async () => {
      try {
        const currentMonth = dayjs(new Date()).format('YYYY-MM')
        const allItems = await Item.find({})
        const items = allItems.filter(
          item => item.itemDate.substring(0, 7) === currentMonth,
        )
        return items
      } catch (err) {
        throw new Error('Current month not found')
      }
    },
    getSpecificMonth: async (_, args) => {
      try {
        const allItems = await Item.find({})
        const items = allItems.filter(
          item => item.itemDate.substring(0, 7) === args.selectedMonth,
        )
        return items
      } catch (err) {
        throw new Error('Specific month not found')
      }
    },
    getItemsByUser: async (_, args) => {
      try {
        const allItems = await Item.find({})
        const itemsByUser = allItems.filter(
          item => item.createdBy.username === args.username,
        )
        return itemsByUser
      } catch (err) {
        throw new Error(err)
      }
    },
  },

  Mutation: {
    addItem: async (
      _,
      { itemInput: { itemDate, itemName, itemCategory, itemPrice } },
      context,
    ) => {
      const currentUser = await checkAuthorization(context)
      const { valid, errors } = validateItemInput(
        itemDate,
        itemName,
        itemCategory,
        itemPrice,
      )
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const createdBy = {
        username: currentUser.username,
        name: currentUser.name,
        date: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
      }

      itemPrice = {
        price: itemPrice,
        currency: 'Kč',
      }

      const itemUpdated = {
        isUpdated: false,
        updatedBy: null,
        updateStamp: null,
      }

      const item = new Item({
        itemDate,
        itemName,
        itemCategory,
        itemPrice,
        itemUpdated,
        createdBy,
      })
      await item.save()
      return item
    },
    editItem: async (_, args, context) => {
      const currentUser = await checkAuthorization(context)
      let item = {}

      try {
        item = await Item.findById(args.itemID)
      } catch (err) {
        throw new Error('ID of an item does not exist')
      }

      if (!args.itemInput) {
        throw new Error('At least one field must be edited')
      }

      let { itemDate, itemName, itemCategory, itemPrice, itemUpdated } =
        args.itemInput

      if (itemDate) {
        itemDate = dayjs(itemDate).format('YYYY-MM-DDTHH:mm:ss')
      }

      if (itemPrice) {
        itemPrice = { ...itemPrice, currency: item.itemPrice.currency }
      } else {
        itemPrice = {
          ...itemPrice,
          price: item.itemPrice.price,
          currency: item.itemPrice.currency,
        }
      }

      if (itemDate || itemName || itemCategory || itemPrice) {
        const currentDate = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss')
        itemUpdated = {
          ...itemUpdated,
          isUpdated: true,
          updatedBy: currentUser.username,
          updateStamp: currentDate,
        }

        const itemBody = await Item.findOneAndUpdate(
          { _id: args.itemID },
          {
            $set: {
              itemDate: itemDate,
              itemName: itemName,
              itemCategory: itemCategory,
              itemPrice: itemPrice,
              itemUpdated: itemUpdated,
            },
          },
        )
        return itemBody
      }
    },
    removeItem: async (_, { itemId }, context) => {
      await checkAuthorization(context)
      try {
        const item = await Item.findByIdAndDelete(itemId)
        await item.delete()
        return `ID ${itemId} deleted successfully`
      } catch (err) {
        throw new Error('ID of an item does not exist')
      }
    },
  },
}

module.exports = itemsResolvers
