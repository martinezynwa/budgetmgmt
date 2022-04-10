import { useMutation } from '@apollo/client'

import { DELETE_ITEM } from '../graphql/mutations'
import { CURRENT_MONTH_BY_USER } from '../graphql/queries'

const DeleteButton = (itemId, username, selectedMonth) => {
  console.log(':>> ', itemId, username, selectedMonth)
  const [deleteItem] = useMutation(DELETE_ITEM, {
    variables: itemId,
    onError(err) {
      console.log('errorek', err)
    },
    refetchQueries: () => [
      {
        query: CURRENT_MONTH_BY_USER,
        variables: {
          selectedMonth: selectedMonth,
          username: '',
        },
      },
      {
        query: CURRENT_MONTH_BY_USER,
        variables: {
          selectedMonth: selectedMonth,
          username: username,
        },
      },
    ],
  })

  return (
    <div>
      <button onClick={() => deleteItem(itemId)}>delete</button>
    </div>
  )
}

export default DeleteButton
