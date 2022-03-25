const itemsResolvers = require('./items')
const usersResolvers = require('./users')
const categoryResolvers = require('./categories')

const indexOfResolvers = {
  Query: {
    ...itemsResolvers.Query,
    ...usersResolvers.Query,
    ...categoryResolvers.Query,
  },
  Mutation: {
    ...itemsResolvers.Mutation,
    ...usersResolvers.Mutation,
    ...categoryResolvers.Mutation,
  },
}

module.exports = indexOfResolvers
