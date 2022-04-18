const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return {
        ...state,
        notification: action.data,
      }
    default:
      return state
  }
}

export default notificationReducer
