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

const ItemContext = createContext()

export const ItemProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState(
    dayjs(new Date()).format('YYYY-MM'),
  )
  const [state, dispatch] = useReducer(itemReducer, [])

  const result = useQuery(CURRENT_MONTH_BY_USER, {
    variables: { selectedMonth },
  })

  let items = result?.data?.getCurrentMonthByUser || []

  useEffect(() => {
    if (result.data && result.data.getCurrentMonthByUser) {
      dispatch({
        type: 'CURRENT_MONTH',
        items: result.data.getCurrentMonthByUser,
      })
    }
  }, [result.data])

  const getItemsByUser = username => {
    dispatch({
      type: 'BY_USER',
      data: { items, username },
    })
  }

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
