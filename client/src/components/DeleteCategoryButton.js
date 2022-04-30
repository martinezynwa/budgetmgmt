import { useMutation } from '@apollo/client'
import { DELETE_CATEGORY } from '../graphql/mutations'
import { ALL_CATEGORIES } from '../graphql/queries'
import useNotification from '../context/NotificationContext'
import { FaTrashAlt } from 'react-icons/fa'
import '../styles/components/CategoryForm.css'

const DeleteCategoryButton = ({ id }) => {
  const { setNotification } = useNotification()

  const [deleteItem] = useMutation(DELETE_CATEGORY, {
    variables: id,
    onError(err) {
      console.log(err)
    },
    refetchQueries: () => [
      {
        query: ALL_CATEGORIES,
      },
    ],
    onCompleted: () => {
      setNotification('deleted', 5)
    },
  })

  const triggerDeletion = id => {
    deleteItem({ variables: { categoryId: id } })
  }

  return (
    <div>
      <FaTrashAlt
        className="deleteCategory"
        onClick={() => triggerDeletion(id)}></FaTrashAlt>
    </div>
  )
}

export default DeleteCategoryButton
