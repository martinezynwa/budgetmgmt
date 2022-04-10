import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Table } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { DELETE_ITEM } from '../graphql/mutations'
import { CURRENT_MONTH_BY_USER } from '../graphql/queries'

const dayjs = require('dayjs')

const TableOfItems = ({ username }) => {
  let refreshedUsername = ''
  const selectedMonth = dayjs(new Date()).format('YYYY-MM')
  let items = []
  const result = useQuery(CURRENT_MONTH_BY_USER, {
    variables: { selectedMonth, username },
  })

  if (result.data && result.data.getCurrentMonthByUser) {
    items = [...result.data.getCurrentMonthByUser]
  }

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
          username: '',
        },
      },
    ],
  })

  const triggerDeletion = (itemId, username) => {
    refreshedUsername = username
    deleteItem({ variables: { itemId: itemId } })
  }

  return (
    <div>
      <div>
        <h1>Items</h1>
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
            {items.map(item => (
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
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default TableOfItems
