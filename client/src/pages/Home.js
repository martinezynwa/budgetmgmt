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
      <div className="flex flex-col gap-8 lg:w-3/4 xl:w-3/5 sm:ml-[340px]">
        <TotalCard selectedMonth={selectedMonth} />
        <ItemForm />
        <Items />
      </div>
    </ItemProvider>
  )
}

export default Home
