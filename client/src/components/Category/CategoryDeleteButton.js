import { useMutation } from '@apollo/client'
import { useConfirmDialog } from '../../hooks/useConfirmDialog'
import useNotification from '../../context/NotificationContext'
import ConfirmDialog from '../Dialog/ConfirmDialog'
import { ALL_CATEGORIES } from '../../graphql/queries'
import { DELETE_CATEGORY } from '../../graphql/mutations'
import { FaTrashAlt } from 'react-icons/fa'

//button for category deletion
const DeleteCategoryButton = ({ id }) => {
  const { setNotification } = useNotification()
  const { dialog, handleInputMessage, handleActionDialog } = useConfirmDialog()

  //mutation for deletion of a single category
  const [deleteItem] = useMutation(DELETE_CATEGORY, {
    variables: id,
    onError(err) {
      setNotification(err.graphQLErrors[0].message, 5, 'error')
    },
    refetchQueries: () => [
      //refresh of category list
      {
        query: ALL_CATEGORIES,
      },
    ],
    onCompleted: () => {
      setNotification('Category deleted', 5)
    },
  })

  //dialog for confirmation of deletion
  const dialogConfirmation = confirm => {
    if (confirm) {
      handleActionDialog('', false)
      deleteItem({ variables: { categoryId: id } })
    } else {
      handleActionDialog('', false)
    }
  }

  return (
    <div>
      <FaTrashAlt
        className="text-2xl"
        onClick={() => handleInputMessage('Delete category?')}></FaTrashAlt>
      {dialog.isLoading && (
        <ConfirmDialog onDialog={dialogConfirmation} message={dialog.message} />
      )}
    </div>
  )
}

export default DeleteCategoryButton
