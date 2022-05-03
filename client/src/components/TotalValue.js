import { GET_TOTAL } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const TotalValue = ({ username, selectedMonth }) => {
  let total = []
  const resultTotal = useQuery(GET_TOTAL, {
    variables: { selectedMonth, username },
  })

  if (resultTotal.data && resultTotal.data.getTotals) {
    total = [...resultTotal.data.getTotals]
  }
  const returnTotal = total.find(t => t.username === username)

  if (!returnTotal) {
    return 0
  }

  return returnTotal.total
}

export default TotalValue
