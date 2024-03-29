import StatisticsCard from './StatisticsCard'
import { useQuery } from '@apollo/client'
import { GET_CATEGORY_TOTALS } from '../../graphql/queries'
import dayjs from 'dayjs'

//component of statistics page displaying spending per category
const StatisticsList = ({ selectedMonth }) => {
  let categoryTotals = []
  const result = useQuery(GET_CATEGORY_TOTALS, {
    variables: { selectedMonth },
  })

  //displaying the total per category in the selected month, current month default
  if (result.data && result.data.getCategoryTotals) {
    categoryTotals = [...result.data.getCategoryTotals]
  }

  return (
    <div className="page-container">
      <h2 className="page-container-header">
        {dayjs(selectedMonth).format('MMMM YYYY')}
      </h2>
      {categoryTotals
        ? categoryTotals.map(c => (
            <StatisticsCard
              key={c.category}
              category={c.category}
              total={c.total}
            />
          ))
        : null}
    </div>
  )
}

export default StatisticsList
