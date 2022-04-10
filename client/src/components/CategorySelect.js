import React, { useState, useEffect } from 'react'

import { ALL_CATEGORIES } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const CategorySelect = ({ itemCategory }) => {
  const result = useQuery(ALL_CATEGORIES)

  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (result.data) {
      setCategories([...result.data.getCategories])
    }
  }, [result.data])

  return (
    <>
      <option value>{itemCategory}</option>
      {categories.map(category => (
        <option key={category.categoryName} value={category.categoryName}>
          {category.categoryName}
        </option>
      ))}
    </>
  )
}

export default CategorySelect
