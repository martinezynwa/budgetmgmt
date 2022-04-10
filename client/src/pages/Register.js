import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client'
import { AuthContext } from '../context/auth'
import { REGISTER_USER } from '../graphql/mutations'
import { Form, Button } from 'react-bootstrap'

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
    console.log('inputValues :>> ', inputValues)
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            id="name"
            name="name"
            type="text"
            value={inputValues.name}
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
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={inputValues.confirmPassword}
            onChange={onChange}
          />
          <Form.Label>Email</Form.Label>
          <Form.Control
            id="email"
            name="email"
            type="email"
            value={inputValues.email}
            onChange={onChange}
          />
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
