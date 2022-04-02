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

export { CURRENT_MONTH }
