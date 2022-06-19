const TotalDifference = ({ username, totals }) => {
  if (!username || totals.length <= 1) {
    return null
  }

  const totalOfUser = totals.find(t => t.username === username)

  if (!totalOfUser) {
    return null
  }
  const { total } = totalOfUser

  const highestSpender = Math.max(...totals.map(t => t.total))

  const difference = total - highestSpender

  if (difference >= 0) {
    return null
  }

  return <div className="difference">{difference} Kč</div>
}

export default TotalDifference
