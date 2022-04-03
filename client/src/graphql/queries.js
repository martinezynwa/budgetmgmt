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

const ALL_CATEGORIES = gql`
  query getCategories {
    getCategories {
      categoryName
    }
  }
`

export { CURRENT_MONTH, ALL_CATEGORIES }
