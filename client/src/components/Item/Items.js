import ItemCard from './ItemCard'
import useItem from '../../context/ItemsContext'
import SelectButton from '../../components/Item/SelectItemsButton'

//displaying all items from database
const Items = () => {
  const { items } = useItem()

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-container">
      <h2 className="text-headMobile sm:text-head mb-4 font-semibold">Items</h2>
      <SelectButton />
      {items ? items.map(item => <ItemCard key={item.id} item={item} />) : null}
    </div>
  )
}

export default Items
