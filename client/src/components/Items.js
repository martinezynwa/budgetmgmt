import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import TableOfItems from '../components/TableOfItems'
import { ALL_USERS } from '../graphql/queries'

const Items = () => {
  let users = []
  const result = useQuery(ALL_USERS)

  const [username, setUsername] = useState('')

  if (result.data && result.data.getUsers) {
    users = [...result.data.getUsers]
  }
  if (users.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setUsername('')}>All items</button>
        {users.map(user => (
          <button onClick={() => setUsername(user.username)} key={user.name}>
            {user.name}
          </button>
        ))}
        <TableOfItems username={username} />
      </div>
    </div>
  )
}

export default Items
