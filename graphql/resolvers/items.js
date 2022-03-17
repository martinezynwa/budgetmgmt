const dayjs = require('dayjs')
const Item = require('../../models/Item')
const { checkAuthorization } = require('../../util/auth')

const itemsResolvers = {
  Query: {
    getItems: async () => {
      const items = await Item.find({})
      if (items) {
        return items
      }
    },
    getSingleItem: async (_, args) => {
      const item = await Item.findById(args.itemID)
      if (item) {
        return item
      }
    },
    getSpecificMonth: async (_, args) => {
      const allItems = await Item.find({})
      const items = allItems.filter(
        item => item.itemDate.substring(0, 7) === args.selectedMonth,
      )
      return items
    },
    getItemsByUser: async (_, args) => {
      const allItems = await Item.find({})
      const itemsByUser = allItems.filter(
        item => item.createdBy.username === args.username,
      )
      return itemsByUser
    },
  },

  Mutation: {
    addItem: async (_, args, context) => {
      const currentUser = await checkAuthorization(context)
      const { itemName, itemPrice, itemUpdated } = args.itemInput
      let { itemDate } = args.itemInput

      if (!itemDate) {
        itemDate = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss')
      } else {
        itemDate = dayjs(itemDate).format('YYYY-MM-DDTHH:mm:ss')
      }
      const createdBy = {
        username: currentUser.username,
        name: currentUser.name,
      }

      itemPrice.currency = 'Kč'
      itemUpdated.isUpdated = false
      const item = new Item({
        itemDate,
        itemName,
        itemPrice,
        itemUpdated,
        createdBy,
      })
      await item.save()

      return item
    },
    editItem: async (_, args, context) => {
      const currentUser = await checkAuthorization(context)
      const { itemID } = args
      let { itemDate, itemName, itemPrice, itemUpdated } = args.itemInput

      if (itemDate) {
        itemDate = dayjs(itemDate).format('YYYY-MM-DDTHH:mm:ss')
      }
      if (itemPrice) {
        itemPrice = { ...itemPrice, price: itemPrice.price, currency: 'Kč' }
      }

      if (itemDate || itemName || itemPrice) {
        const currentDate = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss')
        itemUpdated = {
          ...itemUpdated,
          isUpdated: true,
          updatedBy: currentUser.username,
          updateStamp: currentDate,
        }
        const itemBody = await Item.findByIdAndUpdate(
          itemID,
          { itemDate, itemName, itemPrice, itemUpdated },
          { new: true },
        )
        return itemBody
      }
    },
    removeItem: async (_, { id }, context) => {
      await checkAuthorization(context)
      try {
        const itemID = await Item.findByIdAndDelete(id)
        await itemID.delete()
        return `ID ${id} deleted successfully`
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}

module.exports = itemsResolvers
