import { gql } from 'graphql-tag'

//for google login
const GOOGLE_AUTH = gql`
  mutation googleAuth($idToken: String!) {
    googleAuth(idToken: $idToken) {
      id
      email
      name
      token
      username
      registeredAt
      darkTheme
    }
  }
`

//adding item
const ADD_ITEM = gql`
  mutation addItem(
    $itemDate: String
    $itemName: String
    $itemCategory: String
    $itemPrice: String
  ) {
    addItem(
      itemInput: {
        itemDate: $itemDate
        itemName: $itemName
        itemCategory: $itemCategory
        itemPrice: $itemPrice
      }
    ) {
      id
      itemDate
      itemName
      itemCategory
      itemPrice {
        price
        currency
      }
      itemUpdated {
        isUpdated
        updatedBy
        updateStamp
      }
      createdBy {
        username
        name
        date
      }
    }
  }
`

//updating existing item
const UPDATE_ITEM = gql`
  mutation editItem($itemId: ID!, $itemInput: ItemInput) {
    editItem(itemID: $itemId, itemInput: $itemInput) {
      id
      itemDate
      itemName
      itemCategory
      itemPrice {
        price
        currency
      }
    }
  }
`

//deleting existing item
const DELETE_ITEM = gql`
  mutation removeItem($itemId: ID!) {
    removeItem(itemId: $itemId)
  }
`

//creating of category
const CREATE_CATEGORY = gql`
  mutation createCategory($categoryName: String!, $importance: String!) {
    createCategory(
      categoryInput: { categoryName: $categoryName, importance: $importance }
    ) {
      id
      categoryName
      importance
    }
  }
`

//deleting an existing category
const DELETE_CATEGORY = gql`
  mutation deleteCategory($categoryId: ID!) {
    deleteCategory(categoryId: $categoryId)
  }
`

//change of user name
const CHANGE_NAME = gql`
  mutation changeName($name: String!) {
    changeName(name: $name)
  }
`

//import of custom CSV
const IMPORT_ITEM = gql`
  mutation importItem($importInput: [ImportInput]) {
    importItem(importInput: $importInput)
  }
`

const CLEANUP_AFTER_LOGOUT = gql`
  mutation cleanupAfterLogout($username: String!) {
    cleanupAfterLogout(username: $username)
  }
`

const SET_THEME = gql`
  mutation setTheme($darkTheme: Boolean!) {
    setTheme(darkTheme: $darkTheme)
  }
`

export {
  GOOGLE_AUTH,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  CHANGE_NAME,
  IMPORT_ITEM,
  CLEANUP_AFTER_LOGOUT,
  SET_THEME,
}
