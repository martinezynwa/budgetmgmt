import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client'
import { AuthContext } from '../context/auth'
import { LOGIN_USER } from '../graphql/mutations'

const Login = () => {
  const context = useContext(AuthContext)

  const [inputValues, setInputValues] = useState({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const onChange = event => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    })
  }
  const [addUser] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result.data.loginUser)
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
      <h1>Login</h1>
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
          password
          <input
            id="password"
            type="password"
            value={inputValues.password}
            name="password"
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
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default Login
