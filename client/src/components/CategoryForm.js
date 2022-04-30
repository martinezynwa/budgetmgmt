import React, { useState } from 'react'
import { CREATE_CATEGORY } from '../graphql/mutations'
import { ALL_CATEGORIES } from '../graphql/queries'
import { useMutation } from '@apollo/client'
import useNotification from '../context/NotificationContext'
import '../styles/components/CategoryForm.css'

const CategoryForm = () => {
  const { setNotification } = useNotification()

  const initialState = {
    categoryName: '',
  }
  const [categoryInput, setCategoryInput] = useState(initialState)

  const [errors, setErrors] = useState('')

  const onChange = event => {
    setCategoryInput({
      ...categoryInput,
      [event.target.name]: event.target.value,
    })
  }

  const [addCategory] = useMutation(CREATE_CATEGORY, {
    variables: categoryInput,

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors.category)
    },
    refetchQueries: () => [
      {
        query: ALL_CATEGORIES,
      },
    ],
    onCompleted: () => {
      setCategoryInput(initialState)
      setErrors('')
      setNotification('added', 5)
    },
  })

  const onSubmit = event => {
    event.preventDefault()
    addCategory()
  }
  return (
    <div>
      <div className="header">Add category</div>
      <div className="itemForm">
        <form onSubmit={onSubmit}>
          <div className="formControl">
            <label className="categoryLabel">Name</label>
            <input
              className="categoryInput"
              type="text"
              value={categoryInput.categoryName}
              name="categoryName"
              onChange={onChange}
            />
          </div>
          <span className="error">{errors}</span>

          <button variant="primary" type="submit" className="categoryButton">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default CategoryForm
