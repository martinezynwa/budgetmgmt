import { useState } from 'react'
import DeleteButton from './ItemDeleteButton'
import EditButton from './ItemEditButton'
import CategorySelect from '../Category/CategorySelect'
import { FaCalendarAlt, FaFileAlt, FaListAlt, FaCoins } from 'react-icons/fa'

const EditItem = props => {
  const { navbar, setNavbar } = props
  let { item } = props
  const [error, setError] = useState({ value: false, message: '' })

  /*  console.log('item :>> ', item.createdBy.username);
  console.log('user', user.username)*/

  item = { ...item, itemDate: item.itemDate.split('T')[0] }

  const initialState = {
    itemDate: item.itemDate,
    itemName: '',
    itemCategory: '',
    itemPrice: '',
  }
  const [itemInput, setItemInput] = useState(initialState)

  const itemForm = [
    {
      label: 'Date',
      value: itemInput.itemDate,
      type: 'date',
      icon: <FaCalendarAlt />,
    },
    {
      label: 'Name',
      value: itemInput.itemName,
      type: 'text',
      placeholder: 'Item name',
      icon: <FaFileAlt />,
    },
    {
      label: 'Category',
      value: itemInput.itemCategory,
      type: 'text',
      icon: <FaListAlt />,
    },
    {
      label: 'Price',
      value: itemInput.itemPrice,
      type: 'number',
      placeholder: 'Item price',
      icon: <FaCoins />,
    },
  ]

  const onChange = event => {
    setItemInput({
      ...itemInput,
      [event.target.name]: event.target.value,
    })
  }

  const handleError = message => {
    setError({ ...error, value: true, message: message })
  }

  return (
    <>
      <div className="fixed top-0 right-0 w-full sm:w-96 h-screen px-2 pt-4 dark:bg-editOffcanvasColor bg-editOffcanvasColorLight">
        <h2 className="w-full mb-6 text-center text-3xl dark:text-headingColor text-headingColorLight font-semibold">
          Edit Item
        </h2>
        <form className="flex flex-col mb-0 rounded-xl">
          {itemForm.map(i => (
            <div
              key={i.label}
              className="flex flex-row items-center py-2 sm:py-0">
              <div className="text-3xl pr-3 sm:p-3 dark:text-iconColor text-iconColorLight">{i.icon}</div>
              {i.label !== 'Category' ? (
                <input
                  className='h-10 w-full bg-transparent rounded-md dark:text-formPlaceholderColor text-formPlaceholderColorLight'
                  type={i.type}
                  name={`item${i.label}`}
                  value={i.value}
                  placeholder={
                    i.label === 'Price'
                      ? `${item.itemPrice.price} ${item.itemPrice.currency}`
                      : item[`item${i.label}`]
                  }
                  onChange={onChange}
                  required
                  maxLength="20"
                  min={`${i.type === 'number' ? '0' : ''}`}
                  max={`${i.type === 'number' ? '99999' : ''}`}
                />
              ) : (
                <select
                  className='h-10 w-full bg-sidebar rounded-md dark:text-formPlaceholderColor text-formPlaceholderColorLight dark:bg-editOffcanvasColor bg-editOffcanvasColorLight'
                  type={i.type}
                  name={`item${i.label}`}
                  onChange={onChange}
                  required>
                  <CategorySelect category={item[`item${i.label}`]} />
                </select>
              )}
            </div>
          ))}
        </form>
        <div className="py-1 sm:py-3 text-[15px] font-semibold dark:text-errorColor text-errorColorLight">
          {error.value ? error.message : null}
        </div>
        <div className="flex flex-col gap-3">
          <EditButton
            item={item}
            itemInput={itemInput}
            handleClose={() => setNavbar(!navbar)}
            handleError={handleError}
          />
          <DeleteButton
            item={item}
            handleClose={() => setNavbar(!navbar)}
            handleError={handleError}
          />
          <button
            className="w-full p-2 text-center text-button rounded-md font-semibold bg-slate-200 hover:bg-slate-300"
            onClick={() => setNavbar(!navbar)}>
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default EditItem
