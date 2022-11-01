import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useToggle } from '../../hooks/useToggle'
import useNotification from '../../context/NotificationContext'
import { ALL_CATEGORIES } from '../../graphql/queries'
import { CREATE_CATEGORY } from '../../graphql/mutations'

//category addition
const CategoryForm = () => {
  const { setNotification } = useNotification()

  const initialState = {
    categoryName: '',
    importance: '',
  }
  const { formVisibility, toggleForm, Toggle } = useToggle()
  const [categoryInput, setCategoryInput] = useState(initialState)

  const onChange = event => {
    setCategoryInput({
      ...categoryInput,
      [event.target.name]: event.target.value,
    })
  }

  //mutation for category addition
  const [addCategory] = useMutation(CREATE_CATEGORY, {
    variables: categoryInput,

    onError(err) {
      setNotification({
        message: err.graphQLErrors[0].extensions.errors,
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
      setCategoryInput(initialState)
      setNotification({
        message: 'Category created',
        style: 'success',
      })
    },
  })

  const onSubmit = event => {
    event.preventDefault()
    addCategory()
  }

  return (
    <div className="page-container cursor-pointer">
      <Toggle
        formVisibility={formVisibility}
        toggleForm={() => toggleForm()}
        formName="Add Category"
      />
      <div className={formVisibility}>
        <form
          className="flex flex-col gap-3 mt-4 rounded-md"
          onSubmit={onSubmit}>
          <input
            className={`w-full p-2 rounded-md dark:bg-formInputColor bg-formInputColorLight 
              ${
                categoryInput.categoryName
                  ? 'text-black dark:text-white '
                  : 'text-formPlaceholderColorLight dark:text-formPlaceholderColor '
              }  text-formPlaceholderColorLight`}
            type="text"
            value={categoryInput.categoryName}
            name="categoryName"
            placeholder="Name"
            onChange={onChange}
            required
          />
          <input
            className={`w-full p-2 rounded-md dark:bg-formInputColor bg-formInputColorLight 
              ${
                categoryInput.importance
                  ? 'text-black dark:text-white '
                  : 'text-formPlaceholderColorLight dark:text-formPlaceholderColor '
              }  text-formPlaceholderColorLight`}
            type="number"
            value={categoryInput.importance}
            name="importance"
            placeholder="Importance (1-5)"
            onChange={onChange}
            required
            min="1"
            max="5"
          />
          <button className="page-container-button">Add</button>
        </form>
      </div>
    </div>
  )
}

export default CategoryForm
