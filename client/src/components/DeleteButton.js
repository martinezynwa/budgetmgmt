import { useMutation } from '@apollo/client'
import { DELETE_ITEM } from '../graphql/mutations'
import {
  CURRENT_MONTH_BY_USER,
  GET_TOTAL,
  GET_ALL_TIME_TOTALS,
} from '../graphql/queries'
import useNotification from '../context/NotificationContext'
import '../styles/components/ItemForm.css'

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
      { query: GET_ALL_TIME_TOTALS },
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
      <button className="modalButton" onClick={() => triggerDeletion(item.id)}>
        Delete
      </button>
    </div>
  )
}

export default DeleteButton
