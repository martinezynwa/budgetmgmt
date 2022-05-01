import React, { useReducer, createContext, useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { CURRENT_MONTH_BY_USER, ALL_ITEMS } from '../graphql/queries'
import itemReducer from '../reducers/itemReducer'
const dayjs = require('dayjs')

const ItemContext = createContext()

export const ItemProvider = ({ children }) => {
  let allItems = []
  let items = []
  const selectedMonth = dayjs(new Date()).format('YYYY-MM')
  const [state, dispatch] = useReducer(itemReducer, [])

  const result = useQuery(CURRENT_MONTH_BY_USER, {
    variables: { selectedMonth },
  })

  if (result.data && result.data.getCurrentMonthByUser) {
    items = [...result.data.getCurrentMonthByUser]
  }

  const resultAllItems = useQuery(ALL_ITEMS)

  if (resultAllItems.data && resultAllItems.data.getItems) {
    allItems = [...resultAllItems.data.getItems]
  }

  useEffect(() => {
    if (result.data && result.data.getCurrentMonthByUser) {
      dispatch({
        type: 'ALL',
        items: result.data.getCurrentMonthByUser,
      })
    }
  }, [result.data])

  const getItems = (username, selectedMonth) => {
    dispatch({
      type: 'FILTERED',
      data: { items, username, selectedMonth },
    })
  }

  const getAllItems = selectedMonth => {
    dispatch({
      type: 'ALL_ITEMS',
      data: { allItems, selectedMonth },
    })
  }

  const value = {
    items: state.items,
    getItems,
    getAllItems,
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
