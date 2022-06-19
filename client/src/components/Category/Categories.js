import CategoryCard from './CategoryCard'
import useCategory from '../../context/CategoryContext'

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
