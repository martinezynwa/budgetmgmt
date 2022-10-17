import { useState } from 'react'
import { CHANGE_NAME } from '../../graphql/mutations'
import { ALL_USERS } from '../../graphql/queries'
import { useMutation } from '@apollo/client'
import useNotification from '../../context/NotificationContext'
import { useToggle } from '../../hooks/useToggle'

//component allowing changing of username
const NameChange = () => {
  const { setNotification } = useNotification()
  const initialState = {
    name: '',
  }
  const { formVisibility, toggleForm, Toggle } = useToggle()
  const [nameInput, setNameInput] = useState(initialState)
  const [errors, setErrors] = useState('')

  const onChange = event => {
    setNameInput({
      ...nameInput,
      [event.target.name]: event.target.value,
    })
  }

  //mutation to change an username
  const [changeName] = useMutation(CHANGE_NAME, {
    variables: nameInput,

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    refetchQueries: () => [
      {
        query: ALL_USERS,
      },
    ],
    onCompleted: res => {
      setNameInput(initialState)
      setErrors('')
      setNotification(res.changeName, 5)
    },
  })

  const onSubmit = event => {
    event.preventDefault()
    changeName()
  }

  return (
    <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-container cursor-pointer">
      <Toggle
        formVisibility={formVisibility}
        toggleForm={() => toggleForm()}
        formName="Change name"
      />
      <div className={formVisibility}>
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <input
            className="w-full p-2 bg-slate-50 rounded-md"
            type="text"
            value={nameInput.name}
            name="name"
            placeholder="Name"
            onChange={onChange}
          />
          <button className="w-full p-2 rounded-lg text-lg font-semibold bg-sidebarActive">
            Change
          </button>
        </form>
        {errors ? <div className="p-1 text-red-600">{errors}</div> : null}
      </div>
    </div>
  )
}

export default NameChange
