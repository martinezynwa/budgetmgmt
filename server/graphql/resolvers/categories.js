const Category = require('../../models/Category')
const { checkAuthorization } = require('../../util/auth')
const { UserInputError } = require('apollo-server')
const { validateCategoryInput } = require('../../util/validators')
const dayjs = require('dayjs')

const categoryResolvers = {
  Query: {
    getCategories: async () => {
      //get All categories
      const allCategories = await Category.find({})
      const categories = allCategories
        .sort((a, b) => a.categoryName.localeCompare(b.categoryName))
        .sort((a, b) => a.importance - b.importance)

      return categories
    },
  },
  Mutation: {
    createCategory: async (
      //create category
      //importance useful when sorting(1-most used, 5-less used)
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
      //DEMO - check number of items in database
      const allCategories = await Category.find({})
      const categories = allCategories
        .filter(category => category.defaultCategory !== true)
        .sort(
          (a, b) =>
            a.createdBy.date.replaceAll(/[-T:]/g, '') -
            b.createdBy.date.replaceAll(/[-T:]/g, ''),
        )
      if (categories.length >= 10) {
        const category = await Category.findByIdAndDelete(categories[0]._id)
        await category.delete()
      }
      //DEMO end

      const defaultCategory = false //default categories cannot be deleted

      const createdBy = {
        username: currentUser.username,
        name: currentUser.name,
        date: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
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
