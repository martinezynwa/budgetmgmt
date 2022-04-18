import React from 'react'
import { useQuery } from '@apollo/client'
import TableOfItems from '../components/TableOfItems'
import { ALL_USERS } from '../graphql/queries'
import useItem from '../context/ItemsContext'

const dayjs = require('dayjs')

const Items = () => {
  let users = []
  const result = useQuery(ALL_USERS)
  const { getItems } = useItem()
  const currentMonth = dayjs(new Date()).format('YYYY-MM')

  const { items } = useItem()

  if (result.data && result.data.getUsers) {
    users = [...result.data.getUsers]
  }

  return (
    <div>
      <div>
        <button onClick={() => getItems('', currentMonth)}>All items</button>
        {users.map(user => (
          <button
            onClick={() => getItems(user.username, currentMonth)}
            key={user.name}>
            {user.name}
          </button>
        ))}
        <TableOfItems items={items} />
      </div>
    </div>
  )
}

export default Items
