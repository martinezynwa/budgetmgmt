import { useMutation } from '@apollo/client'
import { useConfirmDialog } from '../hooks/useConfirmDialog'
import { DELETE_ITEM } from '../graphql/mutations'
import {
  CURRENT_MONTH_BY_USER,
  GET_TOTAL,
  GET_ALL_TIME_TOTALS,
} from '../graphql/queries'
import useNotification from '../context/NotificationContext'
import ConfirmDialog from './ConfirmDialog'

import '../styles/components/ItemForm.css'

const dayjs = require('dayjs')

const DeleteButton = ({ item }) => {
  const { dialog, handleInputMessage, handleActionDialog } = useConfirmDialog()
  const { setNotification } = useNotification()

  const [deleteItem] = useMutation(DELETE_ITEM, {
    variables: item.id,
    onError(err) {
      setNotification(err.graphQLErrors[0].message, 5, 'error')
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
      { query: GET_ALL_TIME_TOTALS },
    ],
    onCompleted: () => {
      setNotification('Item deleted', 5)
    },
  })

  const dialogConfirmation = confirm => {
    if (confirm) {
      handleActionDialog('', false)
      deleteItem({ variables: { itemId: item.id } })
    } else {
      handleActionDialog('', false)
    }
  }

  return (
    <div>
      <button
        className="modalButton"
        onClick={() => handleInputMessage('Delete item?')}>
        Delete
      </button>
      {dialog.isLoading && (
        <ConfirmDialog onDialog={dialogConfirmation} message={dialog.message} />
      )}
    </div>
  )
}

export default DeleteButton
