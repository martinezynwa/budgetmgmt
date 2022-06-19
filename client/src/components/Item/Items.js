import ItemCard from './ItemCard'
import useItem from '../../context/ItemsContext'

const Items = () => {
  const { items } = useItem()
  return (
    <div>
      {items ? items.map(item => <ItemCard key={item.id} item={item} />) : null}
    </div>
  )
}

export default Items
