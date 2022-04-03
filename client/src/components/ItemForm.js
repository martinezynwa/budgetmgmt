import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_ITEM } from '../graphql/mutations'
import { CURRENT_MONTH } from '../graphql/queries'
import { Button } from 'react-bootstrap'
import CategorySelect from './CategorySelect'
const dayjs = require('dayjs')

const ItemForm = () => {
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

    update(_, result) {},

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    refetchQueries: [{ query: CURRENT_MONTH }],
  })

  const onSubmit = event => {
    event.preventDefault()
    addItem()
    setItemInput(initialState)
  }

  return (
    <div>
      <h2>Add Item</h2>
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
            className="form-select"
            aria-label="Default select example">
            <CategorySelect />
          </select>
        </div>
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default ItemForm
