import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_ITEM } from '../graphql/mutations'
import {
  CURRENT_MONTH_BY_USER,
  GET_TOTAL,
  GET_ALL_TIME_TOTALS,
  GET_CATEGORY_TOTALS,
} from '../graphql/queries'
import { useForm } from '../hooks/useForm'
import useAuth from '../context/AuthContext'
import useNotification from '../context/NotificationContext'
import CategorySelect from './CategorySelect'
import '../styles/components/ItemForm.css'

const dayjs = require('dayjs')

const ItemForm = () => {
  const currentMonth = dayjs(new Date()).format('YYYY-MM')
  const { setNotification } = useNotification()
  const { user } = useAuth()
  const initialState = {
    itemDate: dayjs(new Date()).format('YYYY-MM-DD'),
    itemName: '',
    itemCategory: '',
    itemPrice: '',
  }
  const [itemInput, setItemInput] = useState(initialState)
  const [errors, setErrors] = useState({})
  const { formVisibility, toggleForm, Toggle } = useForm()

  const onChange = event => {
    setItemInput({
      ...itemInput,
      [event.target.name]: event.target.value,
    })
  }

  const [addItem] = useMutation(ADD_ITEM, {
    variables: itemInput,

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    refetchQueries: () => [
      {
        query: CURRENT_MONTH_BY_USER,
        variables: {
          selectedMonth: currentMonth,
        },
      },
      {
        query: CURRENT_MONTH_BY_USER,
        variables: {
          selectedMonth: currentMonth,
          username: user.username,
        },
      },
      {
        query: GET_TOTAL,
        variables: {
          selectedMonth: currentMonth,
          username: user.username,
        },
      },
      {
        query: GET_TOTAL,
        variables: {
          selectedMonth: currentMonth,
          username: 'allUsers',
        },
      },
      { query: GET_ALL_TIME_TOTALS },
      { query: GET_CATEGORY_TOTALS },
    ],
    onCompleted: () => {
      setItemInput(initialState)
      setErrors({})
      setNotification('Item added', 5)
    },
  })

  const onSubmit = event => {
    event.preventDefault()
    addItem()
  }

  return (
    <div className="formContainer">
      <Toggle
        formVisibility={formVisibility}
        toggleForm={() => toggleForm()}
        formName="Add item"
      />
      <div className={formVisibility}>
        <div className="itemForm">
          <form onSubmit={onSubmit}>
            <div className="formControl">
              <label className="formLabel">Date</label>
              <input
                className="formInput"
                type="date"
                value={itemInput.itemDate}
                name="itemDate"
                onChange={onChange}
              />
            </div>
            <span className="formError">{errors.itemDate}</span>

            <div className="formControl">
              <label className="formLabel">Item</label>
              <input
                className="formInput"
                type="text"
                value={itemInput.itemName}
                name="itemName"
                onChange={onChange}
              />
            </div>
            <span className="formError">{errors.itemName}</span>

            <div className="formControl">
              <label className="formLabel">Category</label>
              <select
                className="formSelect"
                type="text"
                name="itemCategory"
                onChange={onChange}
                value={itemInput.itemCategory}>
                <CategorySelect />
              </select>
            </div>
            <span className="formError">{errors.itemCategory}</span>

            <div className="formControl">
              <label className="formLabel">Price</label>
              <input
                className="formInput"
                type="number"
                value={itemInput.itemPrice}
                name="itemPrice"
                onChange={onChange}
              />
            </div>
            <span className="formError">{errors.itemPrice}</span>

            <button variant="primary" type="submit" className="formButton">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ItemForm
