const { gql } = require('apollo-server')

const typeDefs = gql`
  type Item {
    id: ID!
    itemDate: String!
    itemName: String!
    itemCategory: String!
    itemPrice: Price!
    itemUpdated: Updated
    createdBy: CreatedBy!
  }

  type Category {
    categoryName: String!
    categoryType: String!
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
    date: String
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
    itemName: String
    itemCategory: String
    itemPrice: String
    itemUpdated: UpdatedInput
  }

  input CategoryInput {
    categoryName: String
    categoryType: String
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
    getCurrentMonth: [Item]
    getItemsByUser(username: String!): [Item]
    getCategories: [Category]
    getCategory(categoryName: String!): Category
  }

  type Mutation {
    addItem(itemInput: ItemInput): Item!
    editItem(itemID: ID!, itemInput: ItemInput): Item!
    removeItem(itemId: ID!): String!
    createCategory(category: CategoryInput): Category!
    registerUser(registerInput: RegisterInput): User!
    loginUser(username: String!, password: String!): User!
  }
`

module.exports = typeDefs
