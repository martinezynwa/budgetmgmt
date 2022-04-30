const Category = require('../../models/Category')
const { checkAuthorization } = require('../../util/auth')
const { UserInputError } = require('apollo-server')

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
    createCategory: async (_, { categoryInput: { categoryName } }, context) => {
      const currentUser = await checkAuthorization(context)
      if (!categoryName.trim()) {
        throw new UserInputError('Category name cannot be empty', {
          errors: {
            category: 'Category name cannot be empty',
          },
        })
      }
      const categoryCheck = await Category.findOne({ categoryName })
      if (categoryCheck) {
        throw new UserInputError('Category exists already', {
          errors: {
            category: 'Category exists already',
          },
        })
      }

      const createdBy = {
        username: currentUser.username,
        name: currentUser.name,
        date: new Date().toISOString(),
      }

      const newCategory = new Category({
        categoryName,
        createdBy,
      })

      await newCategory.save()

      return newCategory
    },
    deleteCategory: async (_, args, context) => {
      await checkAuthorization(context)
      try {
        const category = await Category.findByIdAndDelete(args.categoryId)
        await category.delete()
        return `ID ${args.categoryId} deleted successfully`
      } catch (err) {
        throw new Error('ID of category does not exist')
      }
    },
  },
}
module.exports = categoryResolvers
