import { useState, useEffect } from 'react'
import { ALL_CATEGORIES } from '../../graphql/queries'
import { useQuery } from '@apollo/client'

//component loads all categories from database when prompted
const CategorySelect = ({ category }) => {
  const result = useQuery(ALL_CATEGORIES)
  const [categories, setCategories] = useState([])

  //returns all categories from database
  useEffect(() => {
    if (result.data) {
      setCategories([...result.data.getCategories])
    }
  }, [result.data])

  return (
    <>
      {category ? (
        <option value>{category}</option>
      ) : (
        <option value="">
          Choose category
        </option>
      )}

      {categories.map(category => (
        <option
          className="dark:text-formSelectedColor text-formSelectedColorLight"
          key={category.categoryName}
          value={category.categoryName}>
          {category.categoryName}
        </option>
      ))}
    </>
  )
}

export default CategorySelect
