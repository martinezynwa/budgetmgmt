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
  const [errors, setErrors] = useState({})

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
    <div className="flex flex-col p-3 rounded-xl bg-container">
      <div className="flex flex-col">
        <h2 className="text-2xl sm:ml-3 sm:text-[28px] py-3 font-semibold">
          Add Item
        </h2>
        <form className="" onSubmit={onSubmit}>
          {itemForm.map(i => (
            <div
              key={i.label}
              className="flex flex-row items-center py-2 sm:py-0">
              <i className="text-3xl pr-3 sm:p-3">{i.icon}</i>
              <div className="flex flex-col w-full">
                {i.label !== 'Category' ? (
                  <input
                    className="pl-1 h-10 w-full bg-slate-50 rounded-md"
                    type={i.type}
                    name={`item${i.label}`}
                    value={i.value}
                    placeholder={i.placeholder}
                    onChange={onChange}
                    required
                    maxLength="20"
                    max={`${i.type === 'number' ? '99999' : ''}`}
                  />
                ) : (
                  <select
                    className={` pl-1 h-10 w-full bg-slate-50 rounded-md ${
                      i.value === '' ? 'text-gray-400' : 'text-black'
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
            </div>
          ))}

          <button className="w-full mt-3 p-2 rounded-lg text-lg font-semibold bg-sidebarActive">
            Add Item
          </button>
        </form>
      </div>
    </div>
  )
}

export default ItemForm
