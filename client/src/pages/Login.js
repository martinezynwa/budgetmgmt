import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import useAuth from '../context/AuthContext'
import { LOGIN_USER } from '../graphql/mutations'
import { Form, Button } from 'react-bootstrap'

const Login = () => {
  const context = useAuth()

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
          <p>{errors.username}</p>
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            name="password"
            type="password"
            value={inputValues.password}
            onChange={onChange}
          />
          <p>{errors.password}</p>
        </Form.Group>
        <p>{errors.general}</p>
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default Login
