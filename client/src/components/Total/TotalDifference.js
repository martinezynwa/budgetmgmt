/*
displays difference in spending between users
it is shown only on an user that has spent less historically than the highest spender
*/
const TotalDifference = ({ username, totals }) => {
  if (!username || totals.length <= 1) {
    return null
  }
  //gets all totals
  const totalOfUser = totals.find(t => t.username === username)

  if (!totalOfUser) {
    return null
  }
  const { total } = totalOfUser

  //counts the highest spender
  const highestSpender = Math.max(...totals.map(t => t.total))

  //difference between selected user and highest spender
  const difference = total - highestSpender

  if (difference >= 0) {
    return null
  }

  return <div className="difference">{difference} Kč</div>
}

export default TotalDifference
