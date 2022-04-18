import React from 'react'
import { useMutation } from '@apollo/client'
import { Table } from 'react-bootstrap'
import { DELETE_ITEM } from '../graphql/mutations'
import { CURRENT_MONTH_BY_USER } from '../graphql/queries'
import useNotification from '../context/NotificationContext'
const dayjs = require('dayjs')

const TableOfItems = ({ items }) => {
  const { setNotification } = useNotification()
  let refreshedUsername = ''

  const [deleteItem] = useMutation(DELETE_ITEM, {
    refetchQueries: () => [
      {
        query: CURRENT_MONTH_BY_USER,
        variables: {
          selectedMonth: dayjs(new Date()).format('YYYY-MM'),
          username: refreshedUsername,
        },
      },
      {
        query: CURRENT_MONTH_BY_USER,
        variables: {
          selectedMonth: dayjs(new Date()).format('YYYY-MM'),
        },
      },
    ],
  })

  const triggerDeletion = (itemId, username) => {
    refreshedUsername = username
    deleteItem({ variables: { itemId: itemId } })
    setNotification('deleted', 5)
  }

  return (
    <div>
      <div>
        <Table size="sm">
          <thead>
            <tr>
              <th>Created by</th>
              <th>Date</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {items
              ? items.map(item => (
                  <tr key={item.id}>
                    <td>{item.createdBy.username}</td>
                    <td>{item.itemDate}</td>
                    <td>{item.itemName}</td>
                    <td>{item.itemCategory}</td>
                    <td>
                      {item.itemPrice.price} {item.itemPrice.currency}
                    </td>
                    <td>
                      {
                        <button
                          onClick={() =>
                            triggerDeletion(item.id, item.createdBy.username)
                          }>
                          delete
                        </button>
                      }
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default TableOfItems
