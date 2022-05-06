import StatisticsCard from './StatisticsCard'
import { useQuery } from '@apollo/client'
import { GET_CATEGORY_TOTALS } from '../graphql/queries'

const StatisticsList = ({ selectedMonth }) => {
  let categoryTotals = []
  const result = useQuery(GET_CATEGORY_TOTALS, {
    variables: { selectedMonth },
  })

  if (result.data && result.data.getCategoryTotals) {
    categoryTotals = [...result.data.getCategoryTotals]
  }

  return (
    <div>
      {categoryTotals
        ? categoryTotals.map(c => (
            <StatisticsCard
              key={c.category}
              category={c.category}
              total={c.total}
              selectedMonth={selectedMonth}
            />
          ))
        : null}
    </div>
  )
}

export default StatisticsList
