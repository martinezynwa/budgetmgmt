import { ItemProvider } from '../context/ItemsContext'
import AllItemsSelection from '../components/Item/AllItemsSelection'
import Items from '../components/Item/Items'

const AllRecords = () => {
  return (
    <ItemProvider>
      <AllItemsSelection />
      <Items />
    </ItemProvider>
  )
}

export default AllRecords
