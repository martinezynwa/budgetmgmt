import React, { useReducer, createContext, useContext } from 'react'
import jwtDecode from 'jwt-decode'
import authReducer from '../reducers/authReducer'

//context for authorization purposes(login, logout)

let userState = {
  username: null,
  name: null,
}

//checking if token hasn't expired yet, during every render of AuthContext
if (localStorage.getItem('jwtToken')) {
  //decoded token from local storage
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken')
  } else {
    //setting up context with user info
    userState = {
      ...userState,
      username: decodedToken.email,
      name: decodedToken.name,
    }
  }
}

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, userState)

  //for logging-in
  const login = data => {
    localStorage.setItem('jwtToken', data.token)
    dispatch({
      type: 'LOGIN',
      payload: data,
    })
  }

  //for log-out
  const logout = () => {
    localStorage.removeItem('jwtToken')
    dispatch({
      type: 'LOGOUT',
    })
  }

  const value = {
    user: state,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthContext')
  }

  return context
}

export default useAuth
