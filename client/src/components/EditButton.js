import { useMutation } from '@apollo/client'
import { useConfirmDialog } from '../hooks/useConfirmDialog'
import ConfirmDialog from './ConfirmDialog'
import { UPDATE_ITEM } from '../graphql/mutations'
import {
  CURRENT_MONTH_BY_USER,
  GET_TOTAL,
  GET_ALL_TIME_TOTALS,
  GET_CATEGORY_TOTALS,
} from '../graphql/queries'
import useNotification from '../context/NotificationContext'
import '../styles/components/ItemForm.css'

const dayjs = require('dayjs')

const EditButton = ({ item, itemInput }) => {
  const { dialog, handleInputMessage, handleActionDialog } = useConfirmDialog()
  const { setNotification } = useNotification()
  const [editItem] = useMutation(UPDATE_ITEM, {
    variables: { itemId: item.id, itemInput: itemInput },
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
      { query: GET_ALL_TIME_TOTALS },
      { query: GET_CATEGORY_TOTALS },
    ],
    onCompleted: () => {
      setNotification('edited', 5)
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
