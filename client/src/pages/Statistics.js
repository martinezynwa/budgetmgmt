import { CategoryProvider } from '../context/CategoryContext'
import StatisticsSelection from '../components/Statistics/StatisticsSelection'

const Statistics = () => {
  return (
    <CategoryProvider>
      <StatisticsSelection />
    </CategoryProvider>
  )
}

export default Statistics
