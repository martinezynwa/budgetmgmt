const { checkAuthorization } = require('../../util/auth')
const { UserInputError } = require('apollo-server')
const Item = require('../../models/Item')
const dayjs = require('dayjs')

const itemsResolvers = {
  Query: {
    //get all items
    getItems: async () => {
      try {
        //sorting by date + time, newest on top
        const allItems = await Item.find({}).sort({ itemDate: -1 })
        return allItems
      } catch (err) {
        throw new Error(err)
      }
    },
    getCurrentMonthByUser: async (_, args) => {
      //get items from current month
      try {
        const allItems = await Item.find({}).sort({ itemDate: -1 })
        //filter by month + username(if provided, otherwise it returns everything)
        const items = allItems
          .filter(item => item.itemDate.substring(0, 7) === args.selectedMonth)
          .filter(item =>
            args.username ? item.createdBy.username === args.username : true,
          )

        return items
      } catch (err) {
        throw new Error('Specific month not found')
      }
    },
    getCategoryTotals: async (_, args) => {
      //totals of current month per category
      try {
        const allItems = await Item.find({})
        const items = allItems
          .filter(item =>
            args.selectedMonth
              ? item.itemDate.substring(0, 7) === args.selectedMonth
              : true,
          )
          .reduce(function (c, x) {
            //filtering each category + its total value
            if (!c[x.itemCategory])
              c[x.itemCategory] = {
                category: x.itemCategory,
                total: 0,
              }
            c[x.itemCategory].total += Number(x.itemPrice.price)
            return c
          }, [])
        return Object.values(items).sort((a, b) => b.total - a.total)
      } catch (err) {
        throw new Error('Specific month not found')
      }
    },
    getTotals: async (_, args) => {
      //getting totals per user using specific month/username
      try {
        const allItems = await Item.find({})
        const items = allItems.filter(item =>
          args.selectedMonth
            ? item.itemDate.substring(0, 7) === args.selectedMonth
            : true,
        )
        const groupAndAdd = items =>
          //filtering totals per each user + for all
          Object.values(
            items.reduce(
              (acc, { createdBy: { username }, itemPrice: { price } }) => {
                acc.allUsers ??= { username: 'allUsers', total: 0 }
                acc.allUsers.total += +price
                if (username in acc) {
                  acc[username].total += +price
                } else {
                  acc[username] = { username, total: +price }
                }
                return acc
              },
              {},
            ),
          )
        return groupAndAdd(items)
      } catch (err) {
        throw new Error('User or month not found')
      }
    },
    getAllTimeTotals: async () => {
      //all time totals
      try {
        const items = await Item.find({})
        const groupAndAdd = items =>
          //filtering totals per each user
          Object.values(
            items.reduce(
              (acc, { createdBy: { username }, itemPrice: { price } }) => {
                if (username in acc) {
                  acc[username].total += +price
                } else {
                  acc[username] = { username, total: +price }
                }
                return acc
              },
              {},
            ),
          )
        return groupAndAdd(items)
      } catch (err) {
        throw new Error('User or month not found')
      }
    },
  },

  Mutation: {
    addItem: async (
      //adding item into database
      _,
      { itemInput: { itemDate, itemName, itemCategory, itemPrice } },
      context,
    ) => {
      const currentUser = await checkAuthorization(context)

      //DEMO - check number of items in database
      const allItems = await Item.find({}).sort({ itemDate: -1 })
      const items = allItems.filter(
        item =>
          item.createdBy.username !== 'U1' && item.createdBy.username !== 'U2',
      )
      if (items.length >= 30) {
        const item = await Item.findByIdAndDelete(items[0]._id)
        await item.delete()
      }
      //DEMO end

      const currentDate = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss')
      itemDate = dayjs(itemDate).format('YYYY-MM-DDTHH:mm:ss')

      if (itemDate.substring(0, 10) === currentDate.substring(0, 10)) {
        itemDate = currentDate
      }

      const createdBy = {
        username: currentUser.username,
        name: currentUser.name,
        date: itemDate,
      }

      itemPrice = {
        price: Number(itemPrice),
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
      //edition of an existing item
      const currentUser = await checkAuthorization(context)
      let item = {}
      let { itemDate, itemName, itemCategory, itemPrice, itemUpdated } =
        args.itemInput

      try {
        item = await Item.findById(args.itemID)
        if (!item) {
          throw new UserInputError('ID of an item does not exist', {
            errors: {
              item: 'ID of an item does not exist',
            },
          })
        }
      } catch (err) {
        throw new Error(err)
      }

      //formatting of date into correct structure or re-using existing
      itemDate
        ? (itemDate = dayjs(itemDate).format('YYYY-MM-DDTHH:mm:ss'))
        : (itemDate = item.itemDate)

      //re-use of existing name if necessary
      if (!itemName) {
        itemName = item.itemName
      }

      //re-use of existing category if necessary
      if (!itemCategory) {
        itemCategory = item.itemCategory
      }

      //re-use of existing price if necessary
      if (itemPrice) {
        itemPrice = Number(itemPrice)
        itemPrice = {
          ...itemPrice,
          price: itemPrice,
          currency: item.itemPrice.currency,
        }
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
    removeItem: async (_, args) => {
      //removing item
      try {
        const item = await Item.findByIdAndDelete(args.itemId)
        await item.delete()
        return `ID ${args.itemId} deleted successfully`
      } catch (err) {
        throw new Error(err)
      }
    },
    importItem: async (_, args, context) => {
      //import of custom CSV into database
      await checkAuthorization(context)
      try {
        const { importInput } = args
        //reading every line from CSV
        importInput.map(i => {
          //correct date format
          let tempDate = (
            i.Year +
            '-' +
            i.Date.replace(/\.$/, '').replace('.', '-')
          ).split('-')
          const itemDate = tempDate[0] + '-' + tempDate[2] + '-' + tempDate[1]

          //correct naming format
          const itemName =
            i.Transaction.charAt(0).toUpperCase() + i.Transaction.slice(1)

          //category
          const itemCategory = i.Type

          //correct price formatf
          let itemPrice = i.Price.slice(0, -3)
          itemPrice = Number(itemPrice.replace(/\s/g, ''))
          itemPrice = {
            ...itemPrice,
            price: itemPrice,
            currency: 'Kč',
          }

          //needed in order to pair with existing emails
          const createdBy = {
            username: i.Name === 'Martin' ? process.env.MG : process.env.MK,
            name: i.Name,
            date: dayjs(itemDate).format('YYYY-MM-DDTHH:mm:ss'),
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
          item.save()
        })
        return 'Items imported'
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}

module.exports = itemsResolvers
