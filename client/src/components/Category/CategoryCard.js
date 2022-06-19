import CategoryIcon from './CategoryIcon'
import CategoryDeleteButton from './CategoryDeleteButton'

const CategoryCard = ({ category }) => {
  return (
    <div className='category-container'>
      <div className="category-card">
        <div className="category-icon">
          <CategoryIcon itemCategory={category.categoryName} />
        </div>
        <div className="category-info">
          <div className="category-name">{category.categoryName}</div>
        </div>
        <div className="delete-category">
          <CategoryDeleteButton id={category.id} />
        </div>
      </div>
    </div>
  )
}

export default CategoryCard
