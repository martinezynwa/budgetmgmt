import { useMutation } from '@apollo/client'
import { useConfirmDialog } from '../hooks/useConfirmDialog'
import { UPDATE_ITEM } from '../graphql/mutations'
import {
  CURRENT_MONTH_BY_USER,
  GET_TOTAL,
  GET_ALL_TIME_TOTALS,
  GET_CATEGORY_TOTALS,
} from '../graphql/queries'
import useNotification from '../context/NotificationContext'
import ConfirmDialog from './ConfirmDialog'
import '../styles/components/ItemForm.css'

const dayjs = require('dayjs')

const EditButton = ({ item, itemInput, handleClose }) => {
  const currentMonth = dayjs(new Date()).format('YYYY-MM')
  const { dialog, handleInputMessage, handleActionDialog } = useConfirmDialog()
  const { setNotification } = useNotification()

  const [editItem] = useMutation(UPDATE_ITEM, {
    variables: { itemId: item.id, itemInput: itemInput },
    onError(err) {
      handleClose()
      setNotification(err.graphQLErrors[0].message, 5, 'error')
    },
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
      setNotification('Item edited', 5)
      handleClose()
    },
  })

  const dialogConfirmation = confirm => {
    if (confirm) {
      handleActionDialog('', false)
      editItem(item.id, itemInput)
    } else {
      handleActionDialog('', false)
    }
  }

  return (
    <div>
      <button
        className="modalButton"
        onClick={() => handleInputMessage('Edit item?')}>
        Edit
      </button>
      {dialog.isLoading && (
        <ConfirmDialog onDialog={dialogConfirmation} message={dialog.message} />
      )}
    </div>
  )
}

export default EditButton
