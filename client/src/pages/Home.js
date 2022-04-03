import React from 'react'
import ItemsTable from '../components/ItemsTable'
import ItemForm from '../components/ItemForm'

const Home = props => {
  return (
    <div>
      <ItemForm />
      <button>user1 list TBD</button> <button>user2 list TBD</button>
      <ItemsTable />
    </div>
  )
}

export default Home
