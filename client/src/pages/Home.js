import React from 'react'

import Notification from '../components/Notification'
import SelectButton from '../components/SelectButton'
import TotalCard from '../components/TotalCard'
import Items from '../components/Items'
import ItemForm from '../components/ItemForm'
import { ItemProvider } from '../context/ItemsContext'
const dayjs = require('dayjs')

const Home = () => {
  const selectedMonth = dayjs(new Date()).format('YYYY-MM')

  return (
    <>
      <ItemProvider>
        <TotalCard selectedMonth={selectedMonth} />
        <ItemForm />
        <SelectButton />
        <Notification />
        <Items />
      </ItemProvider>
    </>
  )
}

export default Home
