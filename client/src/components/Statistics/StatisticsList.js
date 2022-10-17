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
    <div className="p-4 sm:p-6 rounded-xl bg-container">
      <h2 className="text-xl sm:text-[28px] mb-6 font-semibold">
        Spending in {dayjs(selectedMonth).format('MMMM YYYY')}
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
