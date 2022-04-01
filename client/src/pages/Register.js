import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client'
import { AuthContext } from '../context/auth'
import { REGISTER_USER } from '../graphql/mutations'

const Register = () => {
  const context = useContext(AuthContext)

  const [inputValues, setInputValues] = useState({
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
  })

  const [errors, setErrors] = useState({})
  const onChange = event => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    })
  }
  const [addUser] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.registerUser)
      if (result) {
        console.log('registered')
      }
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: inputValues,
  })

  const onSubmit = event => {
    event.preventDefault()
    addUser()
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={inputValues.username}
            name="username"
            onChange={onChange}
          />
        </div>
        <div>
          name
          <input
            id="name"
            type="text"
            value={inputValues.name}
            name="name"
            onChange={onChange}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={inputValues.password}
            name="password"
            onChange={onChange}
          />
        </div>
        <div>
          confirmPassword
          <input
            id="confirmPassword"
            type="password"
            value={inputValues.confirmPassword}
            name="confirmPassword"
            onChange={onChange}
          />
        </div>
        <div>
          email
          <input
            id="email"
            type="email"
            value={inputValues.email}
            name="email"
            onChange={onChange}
          />
        </div>
        {Object.keys(errors).length > 0 && (
          <div>
            <ul>
              {Object.values(errors).map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <button id="register-button" type="submit">
          register
        </button>
      </form>
    </div>
  )
}

export default Register
