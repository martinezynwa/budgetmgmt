const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return {
        ...state,
        notification: action.data,
        style: action.style,
      }
    default:
      return state
  }
}

export default notificationReducer
