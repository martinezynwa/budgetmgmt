import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_ITEM } from '../graphql/mutations'
import { CURRENT_MONTH } from '../graphql/queries'

const ItemForm = () => {
  const initialState = {
    itemDate: '',
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
      <h1>Add item</h1>
      <form onSubmit={onSubmit}>
        <div>
          date
          <input
            id="itemDate"
            type="text"
            value={itemInput.itemDate}
            name="itemDate"
            onChange={onChange}
          />
        </div>
        <div>
          name
          <input
            id="itemName"
            type="text"
            value={itemInput.itemName}
            name="itemName"
            onChange={onChange}
          />
        </div>
        <div>
          category
          <input
            id="itemCategory"
            type="text"
            value={itemInput.itemCategory}
            name="itemCategory"
            onChange={onChange}
          />
        </div>
        <div>
          price
          <input
            id="itemPrice"
            type="text"
            value={itemInput.itemPrice}
            name="itemPrice"
            onChange={onChange}
          />
        </div>
        {Object.keys(errors).length > 0 && (
          <div>
            <ul>
              {Object.values(errors).map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <button id="add-button" type="submit">
          add item
        </button>
      </form>
    </div>
  )
}

export default ItemForm
