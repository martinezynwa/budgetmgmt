import { ItemProvider } from '../context/ItemsContext'
import AllItemsList from '../components/Item/AllItemsList'
import Items from '../components/Item/Items'

//page allowing to display items from history
const AllItems = () => {
  return (
    <ItemProvider>
      <AllItemsList />
      <Items />
    </ItemProvider>
  )
}

export default AllItems
