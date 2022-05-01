import { useMutation } from '@apollo/client'

import { DELETE_ITEM } from '../graphql/mutations'
import { CURRENT_MONTH_BY_USER, GET_TOTAL } from '../graphql/queries'
import useNotification from '../context/NotificationContext'
import Button from 'react-bootstrap/Button'

const dayjs = require('dayjs')

const DeleteButton = ({ item }) => {
  const { setNotification } = useNotification()
  const [deleteItem] = useMutation(DELETE_ITEM, {
    variables: item.id,
    onError(err) {
      console.log(err)
    },
    refetchQueries: () => [
      {
        query: CURRENT_MONTH_BY_USER,
        variables: {
          selectedMonth: dayjs(new Date()).format('YYYY-MM'),
        },
      },
      {
        query: GET_TOTAL,
        variables: {
          selectedMonth: dayjs(new Date()).format('YYYY-MM'),
          username: item.createdBy.username,
        },
      },
      {
        query: GET_TOTAL,
        variables: {
          selectedMonth: dayjs(new Date()).format('YYYY-MM'),
          username: 'allUsers',
        },
      },
    ],
    onCompleted: () => {
      setNotification('deleted', 5)
    },
  })

  const triggerDeletion = id => {
    deleteItem({ variables: { itemId: id } })
  }

  return (
    <div>
      <Button onClick={() => triggerDeletion(item.id)}>Delete</Button>
    </div>
  )
}

export default DeleteButton
