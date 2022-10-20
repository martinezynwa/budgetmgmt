import TotalCard from '../components/Total/TotalCard'
import Items from '../components/Item/Items'
import ItemForm from '../components/Item/ItemForm'
import { ItemProvider } from '../context/ItemsContext'
const dayjs = require('dayjs')

//home page with info about current month
const Home = () => {
  const selectedMonth = dayjs(new Date()).format('YYYY-MM')

  return (
    <ItemProvider>
      <div className="page">
        <TotalCard selectedMonth={selectedMonth} />
        <ItemForm />
        <Items />
      </div>
    </ItemProvider>
  )
}

export default Home
