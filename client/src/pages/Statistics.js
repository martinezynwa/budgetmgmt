import { CategoryProvider } from '../context/CategoryContext'
import StatisticsSelection from '../components/Statistics/StatisticsSelection'

//page displaying statistics
const Statistics = () => {
  return (
    <CategoryProvider>
      <div className="flex flex-col gap-8 lg:w-3/4 xl:w-3/5 sm:ml-[340px]">
        <StatisticsSelection />
      </div>
    </CategoryProvider>
  )
}

export default Statistics
