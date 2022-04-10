import React from 'react'
import Items from '../components/Items'
import ItemForm from '../components/ItemForm'

const Home = props => {
  return (
    <div>
      <ItemForm />
      <Items />
    </div>
  )
}

export default Home
