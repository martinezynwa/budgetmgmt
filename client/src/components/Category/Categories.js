import useCategory from '../../context/CategoryContext'
import CategoryCard from './CategoryCard'

//for displaying all categories from database
const Categories = () => {
  const { categories } = useCategory()

  return (
    <>
      <div className="page-container">
        <h2 className="page-container-header">Categories</h2>
        {categories
          ? categories.map(category => (
              <CategoryCard key={category.categoryName} category={category} />
            ))
          : null}
      </div>
    </>
  )
}

export default Categories
