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
const EditButton = ({ item, itemInput, handleClose }) => {
  const currentMonth = dayjs(new Date()).format('YYYY-MM')
  const { setNotification } = useNotification()

  //mutation for editing an item
  const [editItem] = useMutation(UPDATE_ITEM, {
    variables: { itemId: item.id, itemInput: itemInput },
    onError(err) {
      handleClose()
      setNotification(err.graphQLErrors[0].message, 5, 'error')
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
      setNotification('Item edited', 5)
      handleClose()
    },
  })

  const handleEdit = () => {
    if (
      itemInput.itemDate === '' &&
      itemInput.itemName.trim() === '' &&
      itemInput.itemCategory === '' &&
      itemInput.itemPrice === ''
    ) {
      return console.log('No fields edited')
    }
    editItem(item.id, itemInput)
  }

  return (
    <button
      className="w-full text-center text-xl bg-green-100 rounded-md font-semibold hover:bg-green-200"
      onClick={() => handleEdit()}>
      Edit
    </button>
  )
}

export default EditButton
