import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client'
import { AuthContext } from '../context/auth'
import { LOGIN_USER } from '../graphql/mutations'

import { Form, Button } from 'react-bootstrap'

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

  /*
        {Object.keys(errors).length > 0 && (
          <div>
            <ul>
              {Object.values(errors).map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
  )*/

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            id="username"
            name="username"
            type="text"
            value={inputValues.username}
            onChange={onChange}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            name="password"
            type="password"
            value={inputValues.password}
            onChange={onChange}
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default Login
