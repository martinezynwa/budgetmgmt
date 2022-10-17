import useCategory from '../../context/CategoryContext'
import CategoryCard from './CategoryCard'

//for displaying all categories from database
const Categories = () => {
  const { categories } = useCategory()

  return (
    <>
      <div className="p-4 sm:p-6 rounded-xl bg-container">
        <h2 className="text-2xl sm:text-[28px] mb-4 font-semibold">Categories</h2>
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
