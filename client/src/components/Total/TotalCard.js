import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_USERS, GET_ALL_TIME_TOTALS } from '../../graphql/queries'
import TotalValue from '../Total/TotalValue'
import TotalDifference from './TotalDifference'
import { FaInfoCircle } from 'react-icons/fa'
const dayjs = require('dayjs')

//component displaying total spending per each user+all users
const TotalCard = ({ selectedMonth }) => {
  let users = []
  let totals = []
  const [differenceVisibility, setDifferenceVisibility] = useState(false)
  const result = useQuery(ALL_USERS)
  const resultTotals = useQuery(GET_ALL_TIME_TOTALS)

  if (result.data && result.data.getUsers) {
    users = [...result.data.getUsers]
  }

  if (resultTotals.data && resultTotals.data.getAllTimeTotals) {
    totals = [...resultTotals.data.getAllTimeTotals]
  }

  const hideDifferences = () => {
    differenceVisibility
      ? setDifferenceVisibility(false)
      : setDifferenceVisibility(true)
  }

  return (
    <>
      <div className="page-container">
        <div className="flex flex-row justify-between w-full">
          <h2 className="page-container-header">
            {selectedMonth
              ? `${dayjs(selectedMonth).format('MMMM YYYY')}`
              : null}
          </h2>
          <div className="dark:text-iconColor text-iconColorLight h-4 cursor-pointer">
            <FaInfoCircle onClick={() => hideDifferences()}>
              Differences
            </FaInfoCircle>
          </div>
        </div>
        <div className="flex flex-col space-y-2 dark:text-itemColor text-itemColorLight sm:text-cardList">
          <div className="flex flex-row items-center justify-between">
            <h2 className="font-semibold text-cardList">Total</h2>
            <div className="flex flex-col items-center font-semibold text-cardListMobile sm:text-cardList">
              <TotalValue username="allUsers" selectedMonth={selectedMonth} />{' '}
              Kč
            </div>
          </div>
          {/* listing each user and displaying total spent per month */}
          {users.map(user => (
            <div
              key={user.username}
              className="flex flex-row items-center justify-between">
              <h2 className="font-semibold text-cardListMobile sm:text-cardList">
                {user.name.split(' ')[0]}
              </h2>
              <div className="flex flex-col items-center font-semibold text-cardListMobile sm:text-cardList">
                <TotalValue
                  username={user.username}
                  selectedMonth={selectedMonth}
                />{' '}
                Kč
                {/* historical difference between users */}
                <TotalDifference
                  username={user.username}
                  totals={totals}
                  show={differenceVisibility}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default TotalCard
