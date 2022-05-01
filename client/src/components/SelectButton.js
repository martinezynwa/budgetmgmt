import React, { useState } from 'react'
import { ALL_USERS } from '../graphql/queries'
import useItem from '../context/ItemsContext'

import { useQuery } from '@apollo/client'
import '../styles/components/SelectButton.css'

const dayjs = require('dayjs')

const TotalCard = () => {
  let users = []
  const result = useQuery(ALL_USERS)
  const { getItems } = useItem()
  const [activeButton, setActiveButton] = useState('')
  const currentMonth = dayjs(new Date()).format('YYYY-MM')

  if (result.data && result.data.getUsers) {
    users = [...result.data.getUsers]
  }

  const setItems = (username, currentMonth) => {
    getItems(username, currentMonth)
    setActiveButton(username)
  }
  
  return (
    <div className="buttons">
      <div className={activeButton === '' ? 'selected' : 'nonselected'}>
        <button className="button" onClick={() => setItems('', currentMonth)}>
          All items
        </button>
      </div>
      {users.map(user => (
        <div
          key={user.name}
          className={
            activeButton === user.username ? 'selected' : 'nonselected'
          }>
          <button
            className="button"
            onClick={() => setItems(user.username, currentMonth)}
            key={user.name}>
            {user.name.split(' ')[0]}
          </button>
        </div>
      ))}
    </div>
  )
}

export default TotalCard
