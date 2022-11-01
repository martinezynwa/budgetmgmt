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
        <div className="page-container sm:text-cardList dark:text-itemColor text-itemColorLight">
          <h2 className="page-container-header">Welcome</h2>
          <p>This is a demo version</p>
          <p>Login info is deleted after you logout</p>
          <p>Limit for 10 items and categories</p>
        </div>
        <TotalCard selectedMonth={selectedMonth} />
        <ItemForm />
        <Items />
      </div>
    </ItemProvider>
  )
}

export default Home
