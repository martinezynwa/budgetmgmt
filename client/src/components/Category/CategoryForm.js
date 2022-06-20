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
    <div className="form-container">
      <Toggle
        formVisibility={formVisibility}
        toggleForm={() => toggleForm()}
        formName="Add Category"
      />
      <div className={formVisibility}>
        <form className="item-form" onSubmit={onSubmit}>
          <div className="form-option">
            <label>
              Name{' '}
              <span className="form-error">
                {errors ? errors.categoryName : null}
              </span>
            </label>
            <input
              type="text"
              value={categoryInput.categoryName}
              name="categoryName"
              onChange={onChange}
            />
            <label>
              Importance(1-5){' '}
              <span className="form-error">
                {errors ? errors.importance : null}
              </span>
            </label>
            <input
              type="number"
              value={categoryInput.importance}
              name="importance"
              onChange={onChange}
            />
          </div>
          <button className="form-submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CategoryForm
