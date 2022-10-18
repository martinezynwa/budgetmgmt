import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_ITEM } from '../../graphql/mutations'
import {
  CURRENT_MONTH_BY_USER,
  GET_TOTAL,
  GET_ALL_TIME_TOTALS,
  GET_CATEGORY_TOTALS,
} from '../../graphql/queries'
import useNotification from '../../context/NotificationContext'
const dayjs = require('dayjs')

//for deleting a single item
const DeleteButton = ({ item, handleClose }) => {
  const currentMonth = dayjs(new Date()).format('YYYY-MM')
  const { setNotification } = useNotification()
  const [buttonText, setButtonText] = useState({
    clicked: 0,
    text: 'Delete',
  })

  //mutation for deletion of an item
  const [deleteItem] = useMutation(DELETE_ITEM, {
    variables: item.id,
    onError(err) {
      setNotification(err.graphQLErrors[0].message, 5, 'error')
      handleClose()
    },
    //refetching all values so pages get updated immediately
    refetchQueries: () => [
      {
        query: CURRENT_MONTH_BY_USER,
        variables: {
          selectedMonth: currentMonth,
        },
      },
      {
        query: GET_TOTAL,
        variables: {
          selectedMonth: currentMonth,
          username: item.createdBy.username,
        },
      },
      {
        query: GET_TOTAL,
        variables: {
          selectedMonth: currentMonth,
          username: 'allUsers',
        },
      },
      { query: GET_ALL_TIME_TOTALS },
      {
        query: GET_CATEGORY_TOTALS,
        variables: {
          selectedMonth: currentMonth,
        },
      },
    ],
    onCompleted: () => {
      setNotification('Item deleted', 5)
    },
  })

  const confirmDeletion = text => {
    if (buttonText.clicked >= 2) return

    if (buttonText.clicked === 1) {
      setButtonText({
        ...buttonText,
        clicked: buttonText.clicked + 1,
        text: 'Delete',
      })
      handleClose()
      deleteItem({ variables: { itemId: item.id } })
    }

    if (buttonText.clicked === 0) {
      setButtonText({
        ...buttonText,
        clicked: buttonText.clicked + 1,
        text: text,
      })
    }
  }

  return (
    <button
      className="w-full text-center text-xl rounded-md bg-red-100 font-semibold hover:bg-red-200"
      onClick={() => confirmDeletion('Delete item?')}>
      {buttonText.text}
    </button>
  )
}

export default DeleteButton
