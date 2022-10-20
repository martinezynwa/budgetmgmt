import CategoryIcon from '../Category/CategoryIcon'

//for statistics card
const StatisticsCard = ({ category, total }) => {
  return (
    <div className="flex flex-row py-3 justify-between dark:text-itemColor text-itemColorLight sm:text-cardList">
      <div className="flex flex-row gap-3 font-semibold">
        <CategoryIcon itemCategory={category} />
        <p>{category}</p>
      </div>
      <p className="font-semibold">{total} Kč</p>
    </div>
  )
}

export default StatisticsCard
