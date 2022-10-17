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
      <div className="flex flex-col sm:w-full lg:w-3/4 xl:w-3/5 px-2 sm:ml-12 sm:my-4 gap-8">
        <TotalCard selectedMonth={selectedMonth} />
        <ItemForm />
        <Items />
      </div>
    </ItemProvider>
  )
}

export default Home
