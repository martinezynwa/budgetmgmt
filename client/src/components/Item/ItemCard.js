import React from 'react'
import CategoryIcon from '../Category/CategoryIcon'
import EditItem from './EditItem'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'

const dayjs = require('dayjs')

//card for an item
const ItemCard = ({ item }) => {
  const [navbar, setNavbar] = useState(false)

  return (
    <>
      <div className="flex flex-row items-center py-1 sm:border-b-[1px]">
        <div className="mr-4">
          <CategoryIcon itemCategory={item.itemCategory} />
        </div>
        <div className="flex flex-col w-[100%] align-middle">
          <p className="-mb-1 text-lg font-semibold">{item.itemName}</p>
          <div className="flex flex-row justify-between items-center">
            <p className="text-sm">{item.createdBy.name.split(' ')[0]}</p>
            <div className="flex flex-row gap-3">
              <p className="text-lg sm:text-xl font-semibold">
                {item.itemPrice.price} {item.itemPrice.currency}
              </p>
              <button
                className="text-2xl hover:text-gray-500"
                onClick={() => setNavbar(!navbar)}>
                <FaEdit className='' />
              </button>
            </div>
          </div>
          <p className="text-xs">{dayjs(item.itemDate).format('DD MMM')}</p>
        </div>
      </div>
      {navbar ? (
        <EditItem item={item} navbar={navbar} setNavbar={setNavbar} />
      ) : null}
    </>
  )
}

export default ItemCard
