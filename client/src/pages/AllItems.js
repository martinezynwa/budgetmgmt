import { ItemProvider } from '../context/ItemsContext'
import AllItemsList from '../components/Item/AllItemsList'
import Items from '../components/Item/Items'

//page allowing to display items from history
const AllItems = () => {
  return (
    <ItemProvider>
      <div className="flex flex-col gap-8 lg:w-3/4 xl:w-3/5 sm:ml-[340px]">
        <AllItemsList />
        <Items />
      </div>
    </ItemProvider>
  )
}

export default AllItems
