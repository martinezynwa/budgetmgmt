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
  const [errors, setErrors] = useState('')

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
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    refetchQueries: () => [
      //refresh of category list
      {
        query: ALL_CATEGORIES,
      },
    ],
    onCompleted: () => {
      setCategoryInput(initialState)
      setErrors({})
      setNotification('Category added', 5)
    },
  })

  const onSubmit = event => {
    event.preventDefault()
    addCategory()
  }

  return (
    <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-container cursor-pointer">
      <Toggle
        formVisibility={formVisibility}
        toggleForm={() => toggleForm()}
        formName="Add Category"
      />
      <div className={formVisibility}>
        <form className="flex flex-col gap-3 rounded-md" onSubmit={onSubmit}>
          <input
            className="w-full p-2 bg-slate-50 rounded-md"
            type="text"
            value={categoryInput.categoryName}
            name="categoryName"
            placeholder="Name"
            onChange={onChange}
          />
          <input
            className="w-full p-2 bg-slate-50 rounded-md"
            type="number"
            value={categoryInput.importance}
            name="importance"
            placeholder="Importance"
            onChange={onChange}
          />
          <button className="w-full p-2 rounded-lg text-lg font-semibold bg-sidebarActive">
            Add
          </button>
          {errors ? <div className="p-1 text-red-600">{errors}</div> : null}
        </form>
      </div>
    </div>
  )
}

export default CategoryForm
