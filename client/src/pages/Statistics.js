import { CategoryProvider } from '../context/CategoryContext'
import StatisticsSelection from '../components/Statistics/StatisticsSelection'

//page displaying statistics
const Statistics = () => {
  return (
    <CategoryProvider>
      <div className="page">
        <StatisticsSelection />
      </div>
    </CategoryProvider>
  )
}

export default Statistics
