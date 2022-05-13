const Category = require('../../models/Category')
const { checkAuthorization } = require('../../util/auth')
const { UserInputError } = require('apollo-server')

const { validateCategoryInput } = require('../../util/validators')

const categoryResolvers = {
  Query: {
    getCategories: async () => {
      const allCategories = await Category.find({})
      const categories = allCategories.sort(
        (a, b) => a.importance - b.importance,
      )
      return categories
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
    createCategory: async (
      _,
      { categoryInput: { categoryName, importance } },
      context,
    ) => {
      const currentUser = await checkAuthorization(context)
      const { valid, errors } = validateCategoryInput(categoryName, importance)
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const categoryCheck = await Category.findOne({ categoryName })
      if (categoryCheck) {
        throw new UserInputError('Category exists already', {
          errors: {
            categoryName: 'Category exists already',
          },
        })
      }
      const defaultCategory = false

      const createdBy = {
        username: currentUser.username,
        name: currentUser.name,
        date: new Date().toISOString(),
      }

      const newCategory = new Category({
        categoryName,
        importance,
        defaultCategory,
        createdBy,
      })

      await newCategory.save()

      return newCategory
    },
    deleteCategory: async (_, args, context) => {
      await checkAuthorization(context)
      try {
        const category = await Category.findById(args.categoryId)
        if (category.defaultCategory === true) {
          throw new UserInputError('Default category cannot be deleted', {
            errors: {
              categoryName: 'Default category cannot be deleted',
            },
          })
        }
        await category.delete()
        return `ID ${args.categoryId} deleted successfully`
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}
module.exports = categoryResolvers
