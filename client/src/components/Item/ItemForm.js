import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_ITEM } from '../../graphql/mutations'
import {
  CURRENT_MONTH_BY_USER,
  GET_TOTAL,
  GET_ALL_TIME_TOTALS,
  GET_CATEGORY_TOTALS,
} from '../../graphql/queries'
import useAuth from '../../context/AuthContext'
import useNotification from '../../context/NotificationContext'
import CategorySelect from '../Category/CategorySelect'
import { FaCalendarAlt, FaFileAlt, FaListAlt, FaCoins } from 'react-icons/fa'
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
      setNotification({
        message: err.graphQLErrors[0].extensions.errors,
        style: 'error',
      })
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
      setNotification({
        message: 'Item added',
        style: 'success',
      })
    },
  })

  const onSubmit = event => {
    event.preventDefault()
    addItem()
  }

  const itemForm = [
    {
      label: 'Date',
      value: itemInput.itemDate,
      type: 'date',
      icon: <FaCalendarAlt />,
    },
    {
      label: 'Name',
      value: itemInput.itemName,
      type: 'text',
      placeholder: 'Item name',
      icon: <FaFileAlt />,
    },
    {
      label: 'Category',
      value: itemInput.itemCategory,
      type: 'text',
      icon: <FaListAlt />,
    },
    {
      label: 'Price',
      value: itemInput.itemPrice,
      type: 'number',
      placeholder: 'Item price',
      icon: <FaCoins />,
    },
  ]

  return (
    <div className="page-container">
      <div className="flex flex-col">
      <h2 className="page-container-header">
          Add Item
        </h2>
        <form onSubmit={onSubmit}>
          {itemForm.map(i => (
            <div
              key={i.label}
              className="flex flex-row items-center py-[6px] sm:py-[6px] gap-2">
              <div className="text-3xl dark:text-iconColor text-iconColorLight">
                {i.icon}
              </div>
              {i.label !== 'Category' ? (
                <input
                  className='h-10 w-full bg-transparent dark:text-formSelectedColor text-formSelectedColorLight rounded-md'
                  type={i.type}
                  name={`item${i.label}`}
                  value={i.value}
                  placeholder={i.placeholder}
                  onChange={onChange}
                  required
                  maxLength="20"
                  min={`${i.type === 'number' ? '0' : ''}`}
                  max={`${i.type === 'number' ? '99999' : ''}`}
                />
              ) : (
                <select
                  className={`h-10 w-full dark:bg-containerColor bg-containerColorLight rounded-md ${
                    i.value === ''
                      ? 'dark:text-formPlaceholderColor text-formPlaceholderColorLight'
                      : 'dark:text-formSelectedColor text-formSelectedColorLight'
                  }`}
                  type={i.type}
                  name={`item${i.label}`}
                  value={i.value}
                  onChange={onChange}
                  required>
                  <CategorySelect />
                </select>
              )}
            </div>
          ))}

          <button className="page-container-button">
            Add Item
          </button>
        </form>
      </div>
    </div>
  )
}

export default ItemForm
