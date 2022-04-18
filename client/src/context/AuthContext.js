import React, { useReducer, createContext, useContext } from 'react'
import jwtDecode from 'jwt-decode'
import authReducer from '../reducers/authReducer'

const initialState = {
  user: null,
}

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken')
  } else {
    initialState.user = decodedToken
  }
}

const AuthContext = createContext({
  user: null,
  login: userData => {},
  logout: () => {},
})

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = userData => {
    localStorage.setItem('jwtToken', userData.token)
    dispatch({
      type: 'LOGIN',
      payload: userData,
    })
  }

  const logout = () => {
    localStorage.removeItem('jwtToken')
    dispatch({
      type: 'LOGOUT',
    })
  }

  const value = {
    user: state.user,
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
