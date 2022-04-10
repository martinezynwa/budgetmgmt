import { gql } from 'graphql-tag'

const CURRENT_MONTH = gql`
  query getCurrentMonth {
    getCurrentMonth {
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

const CURRENT_MONTH_BY_USER = gql`
  query getCurrentMonthByUser($selectedMonth: String!, $username: String) {
    getCurrentMonthByUser(selectedMonth: $selectedMonth, username: $username) {
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

const ALL_CATEGORIES = gql`
  query getCategories {
    getCategories {
      categoryName
    }
  }
`

const ALL_USERS = gql`
  query getUsers {
    getUsers {
      name
      username
    }
  }
`

export { CURRENT_MONTH, ALL_CATEGORIES, ALL_USERS, CURRENT_MONTH_BY_USER }
