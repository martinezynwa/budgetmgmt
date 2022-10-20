import React from 'react'
import CategoryIcon from '../Category/CategoryIcon'
import EditItem from './EditItem'
import { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'

const dayjs = require('dayjs')

//card for an item
const ItemCard = ({ item }) => {
  const [navbar, setNavbar] = useState(false)

  return (
    <>
      <div className="flex flex-row items-center py-1 dark:sm:border-b-[1px] dark:sm:border-b-buttonColor">
        <div className="mr-4">
          <CategoryIcon itemCategory={item.itemCategory} />
        </div>
        <div className="flex flex-col w-[100%] align-middle dark:text-itemColor text-itemColorLight">
          <p className="-mb-1 text-lg font-semibold dark:text-headingColor text-headingColorLight">{item.itemName}</p>
          <div className="flex flex-row justify-between items-center">
            <p className="text-sm">{item.createdBy.name.split(' ')[0]}</p>
            <div className="flex flex-row gap-3">
              <p className="text-lg sm:text-xl font-semibold dark:text-headingColor text-headingColorLight">
                {item.itemPrice.price} {item.itemPrice.currency}
              </p>
              <button
                className=""
                onClick={() => setNavbar(!navbar)}>
                <FaRegEdit className='dark:text-iconColor text-iconColorLight dark:hover:text-hoverIconColor hover:text-hoverIconColorLight text-[26px]' />
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
