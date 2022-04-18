import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import useAuth from '../context/AuthContext'
import { REGISTER_USER } from '../graphql/mutations'
import { Form, Button } from 'react-bootstrap'

const Register = () => {
  const context = useAuth()

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
      <h2>Register</h2>
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            id="name"
            name="name"
            type="text"
            value={inputValues.name}
            onChange={onChange}
          />
          <p>{errors.name}</p>

          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            name="password"
            type="password"
            value={inputValues.password}
            onChange={onChange}
          />
          <p>{errors.password}</p>

          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={inputValues.confirmPassword}
            onChange={onChange}
          />
          <p>{errors.confirmPassword}</p>

          <Form.Label>Email</Form.Label>
          <Form.Control
            id="email"
            name="email"
            type="email"
            value={inputValues.email}
            onChange={onChange}
          />
          <p>{errors.email}</p>
        </Form.Group>
        <br />
        <Button variant="primary" type="register">
          Register
        </Button>
      </form>
    </div>
  )
}

export default Register
