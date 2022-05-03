import { gql } from 'graphql-tag'

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
      id
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

const GET_TOTAL = gql`
  query getTotals($selectedMonth: String, $username: String) {
    getTotals(selectedMonth: $selectedMonth, username: $username) {
      username
      total
    }
  }
`

const GET_ALL_TIME_TOTALS = gql`
  query getAllTimeTotals {
    getAllTimeTotals {
      username
      total
    }
  }
`

export {
  ALL_ITEMS,
  CURRENT_MONTH,
  ALL_CATEGORIES,
  ALL_USERS,
  CURRENT_MONTH_BY_USER,
  GET_TOTAL,
  GET_ALL_TIME_TOTALS,
}
