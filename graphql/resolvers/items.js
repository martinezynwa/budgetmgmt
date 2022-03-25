const { checkAuthorization } = require('../../util/auth')
const dayjs = require('dayjs')
const Item = require('../../models/Item')

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
      const { itemName, itemCategory, itemPrice, itemUpdated } = args.itemInput
      let { itemDate } = args.itemInput

      if (!itemDate) {
        itemDate = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss')
      } else {
        itemDate = dayjs(itemDate).format('YYYY-MM-DDTHH:mm:ss')
      }
      const createdBy = {
        username: currentUser.username,
        name: currentUser.name,
        date: new Date().toISOString(),
      }

      itemCategory.categoryName = itemName

      itemPrice.currency = 'Kč'
      itemUpdated.isUpdated = false
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

      const item = await Item.findById(args.itemID)

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

      if (itemCategory) {
        if (!itemCategory.categoryName) {
          itemCategory = {
            ...itemCategory,
            categoryName: item.itemCategory.categoryName,
          }
        }
        if (!itemCategory.categoryType) {
          itemCategory = {
            ...itemCategory,
            categoryType: item.itemCategory.categoryType,
          }
        }
      } else {
        itemCategory = {
          ...itemCategory,
          categoryName: item.itemCategory.categoryName,
          categoryType: item.itemCategory.categoryType,
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
          { upsert: true, new: true },
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
