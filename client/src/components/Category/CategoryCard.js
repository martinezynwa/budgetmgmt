import CategoryIcon from './CategoryIcon'
import CategoryDeleteButton from './CategoryDeleteButton'

//card for a category
const CategoryCard = ({ category }) => {
  return (
    <div className="flex flex-row w-full items-center justify-between py-2 sm:border-b-[1px]">
      <CategoryIcon itemCategory={category.categoryName} />
      <p className="text-xl">{category.categoryName}</p>
      <CategoryDeleteButton id={category.id} />
    </div>
  )
}

export default CategoryCard
