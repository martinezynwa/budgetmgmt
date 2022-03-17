const itemsResolvers = require('./items')
const usersResolvers = require('./users')

const indexOfResolvers = {
  Query: {
    ...itemsResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...itemsResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
}

module.exports = indexOfResolvers
