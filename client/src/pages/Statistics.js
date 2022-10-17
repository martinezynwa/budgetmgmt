import { CategoryProvider } from '../context/CategoryContext'
import StatisticsSelection from '../components/Statistics/StatisticsSelection'

//page displaying statistics
const Statistics = () => {
  return (
    <CategoryProvider>
      <div className="flex flex-col sm:w-full lg:w-3/4 xl:w-3/5 px-2 sm:ml-12 sm:my-4 gap-8">
        <StatisticsSelection />
      </div>
    </CategoryProvider>
  )
}

export default Statistics
