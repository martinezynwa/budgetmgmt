import { CategoryProvider } from '../context/CategoryContext'
import StatisticsSelection from '../components/Statistics/StatisticsSelection'

//page displaying statistics
const Statistics = () => {
  return (
    <CategoryProvider>
      <StatisticsSelection />
    </CategoryProvider>
  )
}

export default Statistics
