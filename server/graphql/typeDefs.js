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
    id: ID!
    categoryName: String!
    importance: String!
    defaultCategory: Boolean
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
    email: String
    name: String
    token: String
    username: String
    registeredAt: String
    darkTheme: Boolean
  }

  input ItemInput {
    itemDate: String
    itemName: String
    itemCategory: String
    itemPrice: String
    itemUpdated: UpdatedInput
  }

  input ImportInput {
    Name: String
    Year: String
    Date: String
    Transaction: String
    Price: String
    Type: String
  }

  input CategoryInput {
    categoryName: String
    defaultCategory: Boolean
    importance: String
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

  type Total {
    username: String
    total: String
  }

  type CategoryTotal {
    category: String
    total: String
  }

  type Query {
    getUsers: [User]
    getItems: [Item]
    getCategories: [Category]
    getCategory(categoryName: String!): Category
    getCurrentMonthByUser(selectedMonth: String!, username: String): [Item]
    getTotals(selectedMonth: String, username: String): [Total]
    getCategoryTotals(selectedMonth: String): [CategoryTotal]
    getAllTimeTotals: [Total]
  }

  type Mutation {
    addItem(itemInput: ItemInput): Item!
    editItem(itemID: ID!, itemInput: ItemInput): Item!
    removeItem(itemId: ID!): String!
    createCategory(categoryInput: CategoryInput): Category!
    deleteCategory(categoryId: ID!): String!
    registerUser(registerInput: RegisterInput): User!
    loginUser(username: String!, password: String!): User!
    importItem(importInput: [ImportInput]): String!
    googleAuth(idToken: String!): User
    changeName(name: String!): String!
    cleanupAfterLogout(username: String!): String!
    setTheme(darkTheme: Boolean!): String!
  }
`

module.exports = typeDefs
