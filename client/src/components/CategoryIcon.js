import {
  FaShoppingBasket,
  FaCar,
  FaCat,
  FaBeer,
  FaWineGlassAlt,
  FaEllipsisH,
} from 'react-icons/fa'
import { RiRestaurantFill } from 'react-icons/ri'

const style = { fontSize: '2em' }

const CategoryIcon = itemCategory => {
  switch (itemCategory.itemCategory) {
    case 'Shopping':
      return <FaShoppingBasket style={style} />
    case 'Car':
      return <FaCar style={style} />
    case 'Pets':
      return <FaCat style={style} />
    case 'Restaurants':
      return <RiRestaurantFill style={style} />
    case 'Beer':
      return <FaBeer style={style} />
    case 'Wine':
      return <FaWineGlassAlt style={style} />
    case 'Others':
      return <FaEllipsisH style={style} />
    default:
      return null
  }
}

export default CategoryIcon
