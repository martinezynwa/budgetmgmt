import { gql } from 'graphql-tag'

const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $name: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    registerUser(
      registerInput: {
        username: $username
        name: $name
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      id
      username
      name
      email
      token
      registeredAt
    }
  }
`

const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
      name
      email
      token
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

const DELETE_ITEM = gql`
  mutation removeItem($itemId: ID!) {
    removeItem(itemId: $itemId)
  }
`

export { REGISTER_USER, LOGIN_USER, ADD_ITEM, DELETE_ITEM }