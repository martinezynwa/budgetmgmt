import React from 'react'
import Stats from '../components/Stats'
import Items from '../components/Items'
import ItemForm from '../components/ItemForm'

const Home = props => {
  return (
    <div>
      <Stats />
      <ItemForm />
      <Items />
    </div>
  )
}

export default Home
