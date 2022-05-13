import CategoryCard from '../components/CategoryCard'
import useCategory from '../context/CategoryContext'

const Categories = () => {
  const { categories } = useCategory()
  return (
    <>
      <div>
        <div className="header">Existing categories</div>

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
