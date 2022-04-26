import ItemCard from '../components/ItemCard'
import useItem from '../context/ItemsContext'

const Items = () => {
  const { items } = useItem()
  //console.log('items :>> ', items)
  return (
    <div>
      {items ? items.map(item => <ItemCard key={item.id} item={item} />) : null}
    </div>
  )
}

export default Items
