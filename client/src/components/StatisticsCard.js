import CategoryIcon from './CategoryIcon'
import '../styles/components/StatisticsCard.css'
const dayjs = require('dayjs')

const StatisticsCard = ({ category, selectedMonth, total }) => {
  if (!selectedMonth) {
    selectedMonth = dayjs(new Date()).format('YYYY-MM')
  }

  return (
    <div className="statisticsCard">
      <div className="statisticsIcon">
        <CategoryIcon itemCategory={category} />
      </div>
      <div className="statisticsInfo">
        <div className="statisticsName">{category}</div>
      </div>
      <div className="statisticsTotal">
        <div>{total} Kč</div>
      </div>
    </div>
  )
}

export default StatisticsCard
