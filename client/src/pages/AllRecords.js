import React from 'react'
import { ItemProvider } from '../context/ItemsContext'
import AllRecordsSelection from '../components/AllRecordsSelection'
import Items from '../components/Items'

const AllRecords = () => {
  return (
    <>
      <ItemProvider>
        <AllRecordsSelection records={true} />
        <Items />
      </ItemProvider>
    </>
  )
}

export default AllRecords
