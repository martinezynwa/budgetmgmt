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
    <div className="form-container">
      <Toggle
        formVisibility={formVisibility}
        toggleForm={() => toggleForm()}
        formName="Change name"
      />
      <div className={formVisibility}>
        <form className="item-form" onSubmit={onSubmit}>
          <div className="form-option">
            <label>
              Name <span className="form-error">{errors ? errors : null}</span>
            </label>
            <input
              type="text"
              value={nameInput.name}
              name="name"
              onChange={onChange}
            />
          </div>
          <button className="form-submit">Change</button>
        </form>
      </div>
    </div>
  )
}

export default NameChange
