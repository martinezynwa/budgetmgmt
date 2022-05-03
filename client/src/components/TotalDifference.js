import '../styles/components/TotalCard.css'

const TotalDifference = ({ username, totals }) => {
  if (!username || totals.length === 0) {
    return null
  }

  let { total } = totals.find(t => t.username === username)
  let highestSpender = Math.max(...totals.map(t => t.total))
  const difference = total - highestSpender

  if (difference >= 0) {
    return null
  }

  return <div className="difference">{difference} Kč</div>
}

export default TotalDifference
