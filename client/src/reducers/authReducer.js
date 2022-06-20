const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        username: action.payload.username,
        name: action.payload.name,
      }
    case 'LOGOUT':
      return {
        ...state,
        username: null,
        name: null,
      }
    default:
      return state
  }
}

export default authReducer
