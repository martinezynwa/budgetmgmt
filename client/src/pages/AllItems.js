import { ItemProvider } from '../context/ItemsContext'
import AllItemsList from '../components/Item/AllItemsList'
import Items from '../components/Item/Items'

//page allowing to display items from history
const AllItems = () => {
  return (
    <ItemProvider>
      <div className="flex flex-col sm:w-full lg:w-3/4 xl:w-3/5 px-2 sm:ml-12 sm:my-4 gap-8">
        <AllItemsList />
        <Items />
      </div>
    </ItemProvider>
  )
}

export default AllItems
