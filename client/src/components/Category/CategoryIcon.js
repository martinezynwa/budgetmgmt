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

const fontSize = '30px'

//icons for categories
const CategoryIcon = itemCategory => {
  switch (itemCategory.itemCategory) {
    case 'Shopping':
      return (
        <FaShoppingBasket style={{ fontSize: fontSize, color: '#4680C2' }} />
      )
    case 'Home':
      return <FaHome style={{ fontSize: fontSize, color: '#54BBFF' }} />
    case 'Pets':
      return <FaCat style={{ fontSize: fontSize, color: '#C19A6B' }} />
    case 'Drugstore':
      return <FaHeart style={{ fontSize: fontSize, color: '#EF4678' }} />
    case 'Gifts':
      return <FaGift style={{ fontSize: fontSize, color: '#F22F46' }} />

    case 'Restaurants':
      return <FaUtensils style={{ fontSize: fontSize, color: '#F0652F' }} />
    case 'Take-out food':
      return <FaPizzaSlice style={{ fontSize: fontSize, color: '#F28834' }} />

    case 'Beer':
      return <FaBeer style={{ fontSize: fontSize, color: '#FFD900' }} />
    case 'Wine':
      return <FaWineGlassAlt style={{ fontSize: fontSize, color: '#EC5252' }} />

    case 'Gas':
      return <FaGasPump style={{ fontSize: fontSize, color: '#8B8B8B' }} />
    case 'Car':
      return <FaCar style={{ fontSize: fontSize, color: '#7DA0D0' }} />

    case 'Transportation':
      return <FaBusAlt style={{ fontSize: fontSize, color: '#72D44C' }} />
    case 'Accomodation':
      return <FaHotel style={{ fontSize: fontSize, color: '#00B67A' }} />
    case 'Concerts':
      return <FaMusic style={{ fontSize: fontSize, color: '#5FCF80' }} />
    case 'Others':
      return <FaEllipsisH style={{ fontSize: fontSize, color: '#654FF0' }} />
    default:
      return <FaRegStar style={{ fontSize: fontSize, color: '#654FF0' }} />
  }
}

export default CategoryIcon
