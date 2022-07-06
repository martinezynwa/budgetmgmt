import { useState } from 'react'
import { ALL_USERS } from '../../graphql/queries'
import useItem from '../../context/ItemsContext'
import { useQuery } from '@apollo/client'
import ScrollContainer from 'react-indiana-drag-scroll'
const dayjs = require('dayjs')

//buttons on home page that allow switching between items per user in the current month + all items
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
    <>
      <ScrollContainer
        className={
          users.length <= 2 ? 'select-buttons centered' : 'select-buttons'
        }>
        <button
          className={activeButton === '' ? 'button' : 'button nonselected'}
          onClick={() => setItems('', currentMonth)}>
          All
        </button>
        {users.map(user => (
          <button
            key={user.username}
            className={
              activeButton === user.username ? 'button' : 'button nonselected'
            }
            onClick={() => setItems(user.username, currentMonth)}>
            {user.name.split(' ')[0]}
          </button>
        ))}
      </ScrollContainer>
    </>
  )
}

export default SelectButton
