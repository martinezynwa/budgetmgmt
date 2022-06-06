import React, { useReducer, createContext, useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_CATEGORIES } from '../graphql/queries'
import categoryReducer from '../reducers/categoryReducer'

const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, [])

  const result = useQuery(ALL_CATEGORIES)

  useEffect(() => {
    if (result.data && result.data.getCategories) {
      dispatch({
        type: 'ALL',
        categories: result.data.getCategories,
      })
    }
  }, [result.data])

  const value = {
    categories: state.categories,
  }

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  )
}

const useCategory = () => {
  const context = useContext(CategoryContext)

  if (context === undefined) {
    throw new Error('useCategory must be used within CategoryContext')
  }

  return context
}

export default useCategory
