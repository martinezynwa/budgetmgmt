import { useMutation } from '@apollo/client'

import { DELETE_ITEM } from '../graphql/mutations'
import { CURRENT_MONTH_BY_USER } from '../graphql/queries'
import useNotification from '../context/NotificationContext'
import Button from 'react-bootstrap/Button'

const dayjs = require('dayjs')

const DeleteButton = itemId => {
  const { setNotification } = useNotification()

  const [deleteItem] = useMutation(DELETE_ITEM, {
    variables: itemId,
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
    ],
  })

  const triggerDeletion = itemId => {
    deleteItem({ variables: { itemId: itemId.itemId } })
    setNotification('deleted', 5)
  }

  return (
    <div>
      <Button onClick={() => triggerDeletion(itemId)}>Delete</Button>
    </div>
  )
}

export default DeleteButton
