import {
  FaShoppingBasket,
  FaCar,
  FaCat,
  FaBeer,
  FaWineGlassAlt,
  FaEllipsisH,
  FaHome,
  FaGift,
  FaRegStar,
  FaBusAlt,
  FaHamburger,
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
    case 'Home':
      return <FaHome style={style} />
    case 'Gifts':
      return <FaGift style={style} />
    case 'Transportation':
      return <FaBusAlt style={style} />
    case 'Take-out food':
      return <FaHamburger style={style} />
    case 'Others':
      return <FaEllipsisH style={style} />
    default:
      return <FaRegStar style={style} />
  }
}

export default CategoryIcon
