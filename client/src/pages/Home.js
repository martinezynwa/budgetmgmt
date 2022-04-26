import React from 'react'
import Notification from '../components/Notification'
import TotalCard from '../components/TotalCard'
import Items from '../components/Items'
import ItemForm from '../components/ItemForm'
import { NotificationProvider } from '../context/NotificationContext'
import { ItemProvider } from '../context/ItemsContext'

const Home = () => {
  return (
    <div>
      <NotificationProvider>
        <ItemProvider>
          <Notification />
          <ItemForm />
          <TotalCard />
          <Items />
        </ItemProvider>
      </NotificationProvider>
    </div>
  )
}

export default Home
