const { checkAuthorization } = require('../../util/auth')
const { UserInputError } = require('apollo-server')
const dayjs = require('dayjs')
const Item = require('../../models/Item')
const { validateItemInput } = require('../../util/validators')

const itemsResolvers = {
  Query: {
    getItems: async () => {
      //get all items
      try {
        const allItems = await Item.find({})
        //sorting by date + time, newest on top
        const items = allItems.sort(
          (a, b) =>
            b.createdBy.date.replaceAll(/[-T:]/g, '') -
            a.createdBy.date.replaceAll(/[-T:]/g, ''),
        )
        return items
      } catch (err) {
        throw new Error(err)
      }
    },
    getCurrentMonthByUser: async (_, args) => {
      //get items from current month
      try {
        const allItems = await Item.find({})
        //posssible filter by month + username
        const items = allItems
          .filter(item => item.itemDate.substring(0, 7) === args.selectedMonth)
          .filter(item =>
            args.username ? item.createdBy.username === args.username : true,
          )
          .sort(
            //sorting by date + time, newest on top
            (a, b) =>
              b.createdBy.date.replaceAll(/[-T:]/g, '') -
              a.createdBy.date.replaceAll(/[-T:]/g, ''),
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

      if (!itemDate && !itemName && !itemCategory && !itemPrice) {
        throw new Error('At least one field must be edited')
      }

      try {
        item = await Item.findById(args.itemID)
        if (!item) {
          throw new UserInputError('ID of an item does not exist', {
            errors: {
              item: 'ID of an item does not exist',
            },
          })
        }
        if (item.createdBy.username !== currentUser.username) {
          throw new UserInputError(
            'Item can be edited only by an user who created it',
            {
              errors: {
                item: 'Item can be edited only by an user who created it',
              },
            },
          )
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
    removeItem: async (_, args, context) => {
      //removing item
      const currentUser = await checkAuthorization(context)
      try {
        const itemToBeDeleted = await Item.findById(args.itemId)
        if (itemToBeDeleted.createdBy.username !== currentUser.username) {
          throw new UserInputError(
            'Item can be removed only by an user who created it',
            {
              errors: {
                item: 'Item can be removed only by an user who created it',
              },
            },
          )
        }
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
