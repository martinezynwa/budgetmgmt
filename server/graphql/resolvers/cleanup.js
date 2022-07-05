const User = require('../../models/User')
const Item = require('../../models/Item')

//DEMO data removal
const cleanupResolvers = {
  Mutation: {
    cleanupAfterLogout: async (_, args) => {
      const { username } = args
      const allItems = await Item.find({})
      const items = allItems.filter(
        item => item.createdBy.username === username,
      )

      await Item.deleteMany({
        _id: {
          $in: items,
        },
      })

      let user = await User.findOne({ username })
      user = await User.findByIdAndDelete(user._id)
      await user.delete()

      return 'User and data removed'
    },
  },
}

module.exports = cleanupResolvers
