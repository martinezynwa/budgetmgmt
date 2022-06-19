import { useState } from 'react'
import { ALL_USERS } from '../../graphql/queries'
import useItem from '../../context/ItemsContext'
import { useQuery } from '@apollo/client'
const dayjs = require('dayjs')

const SelectButton = () => {
  let users = []
  const result = useQuery(ALL_USERS)
  const { getItemsByUser } = useItem()
  const [activeButton, setActiveButton] = useState('')
  const currentMonth = dayjs(new Date()).format('YYYY-MM')

  if (result.data && result.data.getUsers) {
    users = [...result.data.getUsers]
  }

  const setItems = username => {
    getItemsByUser(username)
    setActiveButton(username)
  }

  return (
    <div className="select-buttons">
      <button
        className={activeButton === '' ? 'button' : 'button nonselected'}
        onClick={() => setItems('', currentMonth)}>
        All items
      </button>
      {users.map(user => (
        <button
          key={user.name}
          className={
            activeButton === user.username ? 'button' : 'button nonselected'
          }
          onClick={() => setItems(user.username, currentMonth)}>
          {user.name.split(' ')[0]}
        </button>
      ))}
    </div>
  )
}

export default SelectButton
