import React from 'react'
import CategoryIcon from './CategoryIcon'
import DeleteCategoryButton from './DeleteCategoryButton'
import '../styles/components/CategoryCard.css'

const CategoryCard = ({ category }) => {
  return (
    <div className="categoryCard">
      <div className="categoryIcon">
        <CategoryIcon itemCategory={category.categoryName} />
      </div>
      <div className="categoryInfo">
        <div className="categoryName">{category.categoryName}</div>
      </div>
      <div className="deleteCategory">
        <DeleteCategoryButton id={category.id} />
      </div>
    </div>
  )
}

export default CategoryCard
