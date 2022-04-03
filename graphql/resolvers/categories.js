const Category = require('../../models/Category')
const { checkAuthorization } = require('../../util/auth')

const categoryResolvers = {
  Query: {
    getCategories: async () => {
      const categories = await Category.find({})
      if (categories) {
        return categories
      }
    },
    getCategory: async (_, args) => {
      const categories = await Category.find({})
      const category = categories.filter(
        category => category.categoryName === args.categoryName,
      )
      return category[0]
    },
  },
  Mutation: {
    createCategory: async (_, args, context) => {
      const currentUser = await checkAuthorization(context)
      const { categoryName } = args.category

      const createdBy = {
        username: currentUser.username,
        name: currentUser.name,
        date: new Date().toISOString(),
      }

      const category = new Category({
        categoryName,
        createdBy,
      })

      await category.save()

      return category
    },
  },
}
module.exports = categoryResolvers
