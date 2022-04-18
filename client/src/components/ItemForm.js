import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_ITEM } from '../graphql/mutations'
import { CURRENT_MONTH_BY_USER } from '../graphql/queries'
import useAuth from '../context/AuthContext'
import useNotification from '../context/NotificationContext'

import { Button } from 'react-bootstrap'
import CategorySelect from './CategorySelect'
const dayjs = require('dayjs')

const ItemForm = () => {
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
          selectedMonth: dayjs(new Date()).format('YYYY-MM'),
          username: user.username,
        },
      },
      {
        query: CURRENT_MONTH_BY_USER,
        variables: {
          selectedMonth: dayjs(new Date()).format('YYYY-MM'),
        },
      },
    ],
    onCompleted: () => {
      setItemInput(initialState)
      setErrors({})
      setNotification('added', 5)
    },
  })

  const onSubmit = event => {
    event.preventDefault()
    addItem()
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Date
            </span>
          </div>
          <input
            type="date"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            id="itemDate"
            value={itemInput.itemDate}
            name="itemDate"
            onChange={onChange}
          />
        </div>
        <p>{errors.itemDate}</p>

        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Item
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            id="itemName"
            value={itemInput.itemName}
            name="itemName"
            onChange={onChange}
          />
        </div>
        <p>{errors.itemName}</p>

        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Category
            </span>
          </div>
          <select
            type="text"
            name="itemCategory"
            onChange={onChange}
            value={itemInput.itemCategory}
            className="form-select"
            aria-label="Default select example">
            <CategorySelect />
          </select>
        </div>
        <p>{errors.itemCategory}</p>

        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Price
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            id="itemPrice"
            value={itemInput.itemPrice}
            name="itemPrice"
            onChange={onChange}
          />
        </div>
        <p>{errors.itemPrice}</p>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default ItemForm
