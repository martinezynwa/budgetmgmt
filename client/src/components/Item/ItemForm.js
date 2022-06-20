import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_ITEM } from '../../graphql/mutations'
import {
  CURRENT_MONTH_BY_USER,
  GET_TOTAL,
  GET_ALL_TIME_TOTALS,
  GET_CATEGORY_TOTALS,
} from '../../graphql/queries'
import { useToggle } from '../../hooks/useToggle'
import useAuth from '../../context/AuthContext'
import useNotification from '../../context/NotificationContext'
import CategorySelect from '../Category/CategorySelect'
const dayjs = require('dayjs')

//for adding an item
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
  const { formVisibility, toggleForm, Toggle } = useToggle()

  const onChange = event => {
    setItemInput({
      ...itemInput,
      [event.target.name]: event.target.value,
    })
  }

  //mutation for creating a single item
  const [addItem] = useMutation(ADD_ITEM, {
    variables: itemInput,

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    //refetching all values so pages get updated immediately
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
      {
        query: GET_CATEGORY_TOTALS,
        variables: {
          selectedMonth: currentMonth,
        },
      },
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
    <div className="form-container">
      <Toggle
        formVisibility={formVisibility}
        toggleForm={() => toggleForm()}
        formName="Add item"
      />
      {/* item form is hidden until form is toggled */}
      <div className={formVisibility}>
        <form className="item-form" onSubmit={onSubmit}>
          <div className="form-option">
            <label>
              Date{' '}
              <span className="form-error">
                {errors ? errors.itemDate : null}
              </span>
            </label>
            <input
              type="date"
              name="itemDate"
              value={itemInput.itemDate}
              onChange={onChange}
            />
          </div>
          <div className="form-option">
            <label>
              Item{' '}
              <span className="form-error">
                {errors ? errors.itemName : null}
              </span>
            </label>
            <input
              type="text"
              name="itemName"
              value={itemInput.itemName}
              onChange={onChange}
            />
          </div>

          <div className="form-option">
            <label>
              Category{' '}
              <span className="form-error">
                {errors ? errors.itemCategory : null}
              </span>
            </label>
            <select
              type="text"
              name="itemCategory"
              onChange={onChange}
              value={itemInput.itemCategory}>
              <CategorySelect />
            </select>
          </div>
          <div className="form-option">
            <label>
              Price{' '}
              <span className="form-error">
                {errors ? errors.itemPrice : null}
              </span>
            </label>
            <input
              type="number"
              name="itemPrice"
              value={itemInput.itemPrice}
              onChange={onChange}
            />
          </div>
          <button className="form-submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ItemForm
