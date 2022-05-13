import { useMutation } from '@apollo/client'
import { useConfirmDialog } from '../hooks/useConfirmDialog'
import { DELETE_CATEGORY } from '../graphql/mutations'
import { ALL_CATEGORIES } from '../graphql/queries'
import useNotification from '../context/NotificationContext'
import { FaTrashAlt } from 'react-icons/fa'
import ConfirmDialog from './ConfirmDialog'
import '../styles/components/CategoryForm.css'

const DeleteCategoryButton = ({ id }) => {
  const { setNotification } = useNotification()
  const { dialog, handleInputMessage, handleActionDialog } = useConfirmDialog()

  const [deleteItem] = useMutation(DELETE_CATEGORY, {
    variables: id,
    onError(err) {
      setNotification(err.graphQLErrors[0].message, 5, 'error')
    },
    refetchQueries: () => [
      {
        query: ALL_CATEGORIES,
      },
    ],
    onCompleted: () => {
      setNotification('Category deleted', 5)
    },
  })

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
        className="deleteCategory"
        onClick={() => handleInputMessage('Delete category?')}></FaTrashAlt>
      {dialog.isLoading && (
        <ConfirmDialog onDialog={dialogConfirmation} message={dialog.message} />
      )}
    </div>
  )
}

export default DeleteCategoryButton
