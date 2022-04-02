import { useMutation } from '@apollo/client'

import { DELETE_ITEM } from '../graphql/mutations'
import { CURRENT_MONTH } from '../graphql/queries'

const DeleteButton = itemId => {
  const [deleteItem] = useMutation(DELETE_ITEM, {
    variables: itemId,
    onError(err) {},
    refetchQueries: [{ query: CURRENT_MONTH }],
  })

  return (
    <div>
      <button onClick={() => deleteItem(itemId)}>delete</button>
    </div>
  )
}

export default DeleteButton
