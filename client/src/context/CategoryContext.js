import React, { useReducer, createContext, useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_CATEGORIES } from '../graphql/queries'
import categoryReducer from '../reducers/categoryReducer'

//context for categories from database
const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, [])

  const { data } = useQuery(ALL_CATEGORIES)

  //getting all categories on load
  useEffect(() => {
    if (data && data.getCategories) {
      dispatch({
        type: 'ALL',
        categories: data.getCategories,
      })
    }
  }, [data])

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
