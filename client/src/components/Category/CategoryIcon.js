import {
  FaShoppingBasket,
  FaUtensils,
  FaGasPump,
  FaCar,
  FaCat,
  FaBeer,
  FaWineGlassAlt,
  FaEllipsisH,
  FaHome,
  FaGift,
  FaRegStar,
  FaBusAlt,
  FaPizzaSlice,
  FaHeart,
  FaHotel,
  FaMusic,
} from 'react-icons/fa'
const style = { fontSize: '30px', color: 'black' }

//icons for categories
const CategoryIcon = itemCategory => {
  switch (itemCategory.itemCategory) {
    case 'Shopping':
      return <FaShoppingBasket style={style} />
    case 'Gas':
      return <FaGasPump style={style} />
    case 'Car':
      return <FaCar style={style} />
    case 'Pets':
      return <FaCat style={style} />
    case 'Restaurants':
      return <FaUtensils style={style} />
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
      return <FaPizzaSlice style={style} />
    case 'Drugstore':
      return <FaHeart style={style} />
    case 'Accomodation':
      return <FaHotel style={style} />
    case 'Concerts':
      return <FaMusic style={style} />
    case 'Others':
      return <FaEllipsisH style={style} />
    default:
      return <FaRegStar style={style} />
  }
}

export default CategoryIcon
