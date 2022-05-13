import React from 'react'

import SelectButton from '../components/SelectButton'
import TotalCard from '../components/TotalCard'
import Items from '../components/Items'
import ItemForm from '../components/ItemForm'
import { ItemProvider } from '../context/ItemsContext'
const dayjs = require('dayjs')

const Home = () => {
  const selectedMonth = dayjs(new Date()).format('YYYY-MM')

  return (
    <div className="container">
      <ItemProvider>
        <ItemForm />
        <TotalCard selectedMonth={selectedMonth} showDifference={true} />
        <SelectButton />
        <Items />
      </ItemProvider>
    </div>
  )
}

export default Home
