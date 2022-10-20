import useAuth from '../../context/AuthContext'
import { useMutation } from '@apollo/client'
import { UPDATE_ITEM } from '../../graphql/mutations'
import {
  CURRENT_MONTH_BY_USER,
  GET_TOTAL,
  GET_ALL_TIME_TOTALS,
  GET_CATEGORY_TOTALS,
} from '../../graphql/queries'
import useNotification from '../../context/NotificationContext'

const dayjs = require('dayjs')

//for editing a single item
const EditButton = ({ item, itemInput, handleClose, handleError }) => {
  const currentMonth = dayjs(new Date()).format('YYYY-MM')
  const { setNotification } = useNotification()
  const { user } = useAuth()

  //mutation for editing an item
  const [editItem] = useMutation(UPDATE_ITEM, {
    variables: { itemId: item.id, itemInput: itemInput },
    onError(err) {
      handleClose()
      setNotification({
        message: 'err.graphQLErrors[0].message',
        style: 'error',
      })
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
      setNotification({
        message: 'Item edited',
        style: 'success',
      })
      handleClose()
    },
  })

  const handleEdit = () => {
    if (item.createdBy.username !== user.username) {
      return handleError('Item can be edited only by a creator.')
    }
    if (
      (itemInput.itemDate === '' || itemInput.itemDate === item.itemDate) &&
      itemInput.itemName.trim() === '' &&
      itemInput.itemCategory === '' &&
      itemInput.itemPrice === ''
    ) {
      return handleError('No fields edited')
    }
    editItem(item.id, itemInput)
  }

  return (
    <button
      className="p-2 mt-2 w-full text-center text-button bg-green-200 rounded-md font-semibold hover:bg-green-300"
      onClick={() => handleEdit()}>
      Edit
    </button>
  )
}

export default EditButton
