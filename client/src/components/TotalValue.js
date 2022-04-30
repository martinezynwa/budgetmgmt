import { GET_TOTAL } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const TotalValue = ({ username }) => {
  let total = []
  const resultTotal = useQuery(GET_TOTAL)

  if (resultTotal.data && resultTotal.data.getTotals) {
    total = [...resultTotal.data.getTotals]
  }

  const returnTotal = total.map(t => (t.username === username ? t.total : null))
  return returnTotal
}

export default TotalValue
