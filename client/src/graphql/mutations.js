import { gql } from 'graphql-tag'

const GOOGLE_AUTH = gql`
  mutation googleAuth($idToken: String!) {
    googleAuth(idToken: $idToken) {
      id
      email
      name
      token
      username
      registeredAt
    }
  }
`

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
const IMPORT_ITEM = gql`
  mutation importItem($importInput: [ImportInput]) {
    importItem(importInput: $importInput)
  }
`

const DELETE_ITEM = gql`
  mutation removeItem($itemId: ID!) {
    removeItem(itemId: $itemId)
  }
`

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
const DELETE_CATEGORY = gql`
  mutation deleteCategory($categoryId: ID!) {
    deleteCategory(categoryId: $categoryId)
  }
`

export {
  GOOGLE_AUTH,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  IMPORT_ITEM,
}
