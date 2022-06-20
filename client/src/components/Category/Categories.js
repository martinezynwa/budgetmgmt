import useCategory from '../../context/CategoryContext'
import CategoryCard from './CategoryCard'

//for displaying all categories from database
const Categories = () => {
  const { categories } = useCategory()

  return (
    <>
      {categories
        ? categories.map(category => (
            <CategoryCard key={category.categoryName} category={category} />
          ))
        : null}
    </>
  )
}

export default Categories
