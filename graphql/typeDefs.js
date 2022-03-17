const { gql } = require('apollo-server')

const typeDefs = gql`
  type Item {
    id: ID!
    itemDate: String
    itemName: String!
    itemPrice: Price!
    itemUpdated: Updated
    createdBy: CreatedBy!
  }

  type Price {
    price: String!
    currency: String
  }

  type Updated {
    isUpdated: Boolean
    updatedBy: String
    updateStamp: String
  }

  type CreatedBy {
    username: String
    name: String
  }

  type User {
    id: ID
    username: String
    name: String
    email: String
    token: String!
    registeredAt: String
  }

  input ItemInput {
    itemDate: String
    itemName: String!
    itemPrice: PriceInput!
    itemUpdated: UpdatedInput
  }

  input PriceInput {
    price: String!
    currency: String
  }

  input UpdatedInput {
    isUpdated: Boolean
    updateStamp: String
  }

  input RegisterInput {
    username: String!
    name: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getItems: [Item]
    getSingleItem(itemID: ID!): Item
    getSpecificMonth(selectedMonth: String!): [Item]
    getItemsByUser(username: String!): [Item]
  }

  type Mutation {
    addItem(itemInput: ItemInput): Item!
    editItem(itemID: ID!, itemInput: ItemInput): Item!
    removeItem(id: ID!): String!
    registerUser(registerInput: RegisterInput): User!
    loginUser(username: String!, password: String!): User!
  }
`

module.exports = typeDefs
