import { useState } from 'react'
import DeleteButton from './ItemDeleteButton'
import EditButton from './ItemEditButton'
import CategorySelect from '../Category/CategorySelect'
import { FaCalendarAlt, FaFileAlt, FaListAlt, FaCoins } from 'react-icons/fa'

const EditItem = props => {
  const { navbar, setNavbar } = props
  let { item } = props
  let message = ''
  const [error, setError] = useState({ value: false, message: '' })

  /*  console.log('item :>> ', item.createdBy.username);
  console.log('user', user.username)*/

  item = { ...item, itemDate: item.itemDate.split('T')[0] }

  const initialState = {
    itemDate: '',
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
      <div className="fixed top-0 right-0 w-full sm:w-96 h-screen px-2 pt-4 bg-sidebar">
        <h2 className="duration-1000 transition-allw-full mb-6 text-center text-2xl font-semibold">
          Edit Item
        </h2>
        <form className="flex flex-col mb-0 rounded-xl">
          {itemForm.map(i => (
            <div
              key={i.label}
              className="flex flex-row items-center py-2 sm:py-0">
              <div className="text-3xl pr-3 sm:p-3">{i.icon}</div>
              <div className="flex flex-col w-full">
                {i.label !== 'Category' ? (
                  <input
                    className="pl-1 h-10 w-full bg-sidebar rounded-md"
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
                    className={` pl-1 h-10 w-full bg-sidebar rounded-md ${
                      i.value === '' ? 'text-gray-400' : 'text-black'
                    }`}
                    type={i.type}
                    name={`item${i.label}`}
                    onChange={onChange}
                    required>
                    <CategorySelect category={item[`item${i.label}`]} />
                  </select>
                )}
              </div>
            </div>
          ))}
        </form>
        <div className="py-1 sm:py-3 text-[15px] font-semibold text-red-500">
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
            className="w-full p-2 text-center text-xl bg-button rounded-md font-semibold hover:bg-hoverButton"
            onClick={() => setNavbar(!navbar)}>
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default EditItem
