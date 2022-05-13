import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import useAuth from '../context/AuthContext'
import { LOGIN_USER } from '../graphql/mutations'
import { Link } from 'react-router-dom'
import '../styles/pages/LoginRegister.css'

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
    <div className="loginRegisterContainer">
      <div className="loginRegisterHeader">Login user</div>
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
          <label className="categoryLabel">Password</label>
          <input
            className="categoryInput"
            type="password"
            name="password"
            value={inputValues.password}
            onChange={onChange}
          />
        </div>
        <span className="error">{errors.password || errors.general}</span>

        <button variant="primary" type="submit" className="categoryButton">
          Login
        </button>
        <div className="notAnUser">
          Not an user?{' '}
          <Link to="/Register" className="registerLinkText">
            Register here
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
