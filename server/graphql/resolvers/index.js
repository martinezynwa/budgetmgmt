const itemsResolvers = require('./items')
const categoryResolvers = require('./categories')
const userResolvers = require('./user')
const cleanupResolvers = require('./cleanup')

const indexOfResolvers = {
  Query: {
    ...itemsResolvers.Query,
    ...categoryResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...itemsResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...userResolvers.Mutation,
    ...cleanupResolvers.Mutation,
  },
}

module.exports = indexOfResolvers
