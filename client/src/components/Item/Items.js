import ItemCard from './ItemCard'
import useItem from '../../context/ItemsContext'
import SelectButton from '../../components/Item/SelectItemsButton'

//displaying all items from database
const Items = () => {
  const { items } = useItem()

  return (
    <div className="page-container">
      <h2 className="page-container-header">Items</h2>
      <SelectButton />
      {items ? items.map(item => <ItemCard key={item.id} item={item} />) : null}
    </div>
  )
}

export default Items
