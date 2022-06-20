import { gql } from 'graphql-tag'

//getting all items from databse
const ALL_ITEMS = gql`
  query getItems {
    getItems {
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

//getting items from current month with filter options
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

//getting all categories
const ALL_CATEGORIES = gql`
  query getCategories {
    getCategories {
      id
      categoryName
      defaultCategory
    }
  }
`

//getting all registered users
const ALL_USERS = gql`
  query getUsers {
    getUsers {
      name
      username
    }
  }
`

//getting totals per user using specific month/username
const GET_TOTAL = gql`
  query getTotals($selectedMonth: String, $username: String) {
    getTotals(selectedMonth: $selectedMonth, username: $username) {
      username
      total
    }
  }
`

//getting all time totals for every user
const GET_ALL_TIME_TOTALS = gql`
  query getAllTimeTotals {
    getAllTimeTotals {
      username
      total
    }
  }
`

//getting totals per category using specific month
const GET_CATEGORY_TOTALS = gql`
  query getCategoryTotals($selectedMonth: String) {
    getCategoryTotals(selectedMonth: $selectedMonth) {
      category
      total
    }
  }
`

export {
  ALL_ITEMS,
  ALL_CATEGORIES,
  ALL_USERS,
  CURRENT_MONTH_BY_USER,
  GET_TOTAL,
  GET_ALL_TIME_TOTALS,
  GET_CATEGORY_TOTALS,
}
