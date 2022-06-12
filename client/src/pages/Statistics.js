import React from 'react'
import { CategoryProvider } from '../context/CategoryContext'
import { ItemProvider } from '../context/ItemsContext'
import AllRecordsSelection from '../components/AllRecordsSelection'

const Statistics = () => {
  return (
    <ItemProvider>
      <CategoryProvider>
        <AllRecordsSelection />
      </CategoryProvider>
    </ItemProvider>
  )
}

export default Statistics
