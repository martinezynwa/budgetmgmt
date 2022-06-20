import CategoryIcon from '../Category/CategoryIcon'

//for statistics card
const StatisticsCard = ({ category, total }) => {
  return (
    <div className="statistics-card">
      <div className="statistics-icon">
        <CategoryIcon itemCategory={category} />
      </div>
      <div className="statistics-info">
        <div className="statistics-name">{category}</div>
      </div>
      <div className="statistics-total">
        <div>{total} Kč</div>
      </div>
    </div>
  )
}

export default StatisticsCard
