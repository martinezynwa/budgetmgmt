const itemsResolvers = require('./items')
const categoryResolvers = require('./categories')
const userResolvers = require('./user')

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
  },
}

module.exports = indexOfResolvers
