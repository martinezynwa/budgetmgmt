import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_ITEM } from '../graphql/mutations'
import { CURRENT_MONTH_BY_USER } from '../graphql/queries'
import useAuth from '../context/AuthContext'
import useNotification from '../context/NotificationContext'
import CategorySelect from './CategorySelect'
import styles from '../styles/components/ItemForm.module.scss'

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
    <div className={styles.itemForm}>
      <form onSubmit={onSubmit}>
        <div className={styles.formControl}>
          <label>Date</label>
          <input
            type="date"
            value={itemInput.itemDate}
            name="itemDate"
            onChange={onChange}
          />
        </div>
        <span className={styles.error}>{errors.itemDate}</span>

        <div className={styles.formControl}>
          <label>Item</label>
          <input
            type="text"
            value={itemInput.itemName}
            name="itemName"
            onChange={onChange}
          />
        </div>
        <span className={styles.error}>{errors.itemName}</span>

        <div className={styles.formControl}>
          <label>Category</label>
          <select
            type="text"
            name="itemCategory"
            onChange={onChange}
            value={itemInput.itemCategory}>
            <CategorySelect />
          </select>
        </div>
        <span className={styles.error}>{errors.itemCategory}</span>

        <div className={styles.formControl}>
          <label>Price</label>
          <input
            type="text"
            value={itemInput.itemPrice}
            name="itemPrice"
            onChange={onChange}
          />
        </div>
        <span className={styles.error}>{errors.itemPrice}</span>

        <button variant="primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default ItemForm
