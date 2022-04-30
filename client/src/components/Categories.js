import React, { useState, useEffect } from 'react'
import CategoryCard from '../components/CategoryCard'
import { ALL_CATEGORIES } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const Categories = () => {
  const result = useQuery(ALL_CATEGORIES)

  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (result.data) {
      setCategories([...result.data.getCategories])
    }
  }, [result.data])
  return (
    <div>
      {categories
        ? categories.map(category => (
            <CategoryCard key={category.categoryName} category={category} />
          ))
        : null}
    </div>
  )
}

export default Categories
