import { useMutation } from '@apollo/client'
import useNotification from '../../context/NotificationContext'
import { ALL_CATEGORIES } from '../../graphql/queries'
import { DELETE_CATEGORY } from '../../graphql/mutations'
import { FaTrashAlt } from 'react-icons/fa'

//button for category deletion
const DeleteCategoryButton = ({ id }) => {
  const { setNotification } = useNotification()

  //mutation for deletion of a single category
  const [deleteItem] = useMutation(DELETE_CATEGORY, {
    variables: id,
    onError(err) {
      setNotification({
        message: err.graphQLErrors[0].message,
        style: 'error',
      })
    },
    refetchQueries: () => [
      //refresh of category list
      {
        query: ALL_CATEGORIES,
      },
    ],
    onCompleted: () => {
      setNotification({
        message: 'Category deleted',
        style: 'success',
      })
    },
  })

  return (
    <div className="text-2xl hover:text-gray-500 cursor-pointer">
      <FaTrashAlt
        onClick={() =>
          deleteItem({ variables: { categoryId: id } })
        }></FaTrashAlt>
    </div>
  )
}

export default DeleteCategoryButton
