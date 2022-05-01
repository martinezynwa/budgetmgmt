import { useMutation } from '@apollo/client'
import Button from 'react-bootstrap/Button'
import { UPDATE_ITEM } from '../graphql/mutations'
import { CURRENT_MONTH_BY_USER, GET_TOTAL } from '../graphql/queries'
import useNotification from '../context/NotificationContext'

const dayjs = require('dayjs')

const EditButton = ({ item, itemInput }) => {
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
    ],
    onCompleted: () => {
      setNotification('edited', 5)
    },
  })

  const triggerEdit = (itemId, itemInput) => {
    editItem(itemId, itemInput)
  }

  return (
    <div>
      <Button onClick={() => triggerEdit(item.id, itemInput)}>Edit</Button>
    </div>
  )
}

export default EditButton
