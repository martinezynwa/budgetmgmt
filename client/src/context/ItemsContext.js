import React, {
  useState,
  useReducer,
  createContext,
  useContext,
  useEffect,
} from 'react'
import { useQuery } from '@apollo/client'
import { CURRENT_MONTH_BY_USER } from '../graphql/queries'
import itemReducer from '../reducers/itemReducer'
const dayjs = require('dayjs')

//context for items from database
const ItemContext = createContext()

export const ItemProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState(
    dayjs(new Date()).format('YYYY-MM'),
  )
  const [state, dispatch] = useReducer(itemReducer, [])

  //loads items from current month by default
  const { data } =
    useQuery(CURRENT_MONTH_BY_USER, {
      variables: { selectedMonth },
    }) || []

  useEffect(() => {
    if (data && data.getCurrentMonthByUser) {
      dispatch({
        type: 'CURRENT_MONTH',
        items: data.getCurrentMonthByUser,
      })
    }
  }, [data])

  //for getting items from current month filtered by username
  const getItemsByUser = username => {
    dispatch({
      type: 'BY_USER',
      data: { data, username },
    })
  }

  //for getting items by specific month
  const getItemsByMonth = month => {
    setSelectedMonth(month)
  }

  const value = {
    items: state.items,
    getItemsByUser,
    getItemsByMonth,
  }

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>
}

const useItem = () => {
  const context = useContext(ItemContext)

  if (context === undefined) {
    throw new Error('useItem must be used within ItemContext')
  }

  return context
}

export default useItem
