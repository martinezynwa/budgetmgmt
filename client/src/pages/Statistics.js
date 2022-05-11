import { CategoryProvider } from '../context/CategoryContext'
import { ItemProvider } from '../context/ItemsContext'
import AllRecordsSelection from '../components/AllRecordsSelection'

const Statistics = () => {
  return (
    <div className="container">
      <ItemProvider>
        <CategoryProvider>
          <AllRecordsSelection />
        </CategoryProvider>
      </ItemProvider>
    </div>
  )
}

export default Statistics
