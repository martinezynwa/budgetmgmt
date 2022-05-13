import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
//import useAuth from '../context/AuthContext'
import useNotification from '../context/NotificationContext'
import { Link } from 'react-router-dom'
import { REGISTER_USER } from '../graphql/mutations'
import { ALL_USERS, GET_ALL_TIME_TOTALS } from '../graphql/queries'

const Register = () => {
  //const context = useAuth()
  const { setNotification } = useNotification()
  const initialValues = {
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
  }
  const [inputValues, setInputValues] = useState(initialValues)

  const [errors, setErrors] = useState({})
  const onChange = event => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    })
  }
  const [addUser] = useMutation(REGISTER_USER, {
    variables: inputValues,
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    refetchQueries: () => [
      { query: ALL_USERS },
      { query: GET_ALL_TIME_TOTALS },
    ],
    onCompleted: () => {
      setInputValues(initialValues)
      setNotification('Successfully registered, you may log-in', 5)
    },
    /*    update(_, result) {
      context.login(result.data.registerUser)
    },*/
  })

  const onSubmit = event => {
    event.preventDefault()
    addUser()
  }

  return (
    <div className="loginRegisterContainer">
      <div className="loginRegisterHeader">Register user</div>
      <form onSubmit={onSubmit}>
        <div className="formControl">
          <label className="categoryLabel">Username</label>
          <input
            className="categoryInput"
            type="text"
            name="username"
            value={inputValues.username}
            onChange={onChange}
          />
          <span className="error">{errors.username}</span>

          <label className="categoryLabel">Name</label>
          <input
            className="categoryInput"
            name="name"
            type="text"
            value={inputValues.name}
            onChange={onChange}
          />
          <span className="error">{errors.name}</span>

          <label className="categoryLabel">Password</label>
          <input
            className="categoryInput"
            name="password"
            type="password"
            value={inputValues.password}
            onChange={onChange}
          />
          <span className="error">{errors.password}</span>

          <label className="categoryLabel">Confirm password</label>
          <input
            className="categoryInput"
            name="confirmPassword"
            type="password"
            value={inputValues.confirmPassword}
            onChange={onChange}
          />
          <span className="error">{errors.confirmPassword}</span>

          <label className="categoryLabel">Email</label>
          <input
            className="categoryInput"
            name="email"
            type="email"
            value={inputValues.email}
            onChange={onChange}
          />
          <span className="error">{errors.email}</span>
        </div>
        <button variant="primary" type="submit" className="categoryButton">
          Register
        </button>
        <div className="notAnUser">
          <Link to="/Login" className="registerLinkText">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register
