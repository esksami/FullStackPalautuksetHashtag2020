let timeoutId

const reducer = (store = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return store
  }
}

export const notify = (message, type, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: { message, type }
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => dispatch({
      type: 'SET_NOTIFICATION',
      notification: null
    }), seconds * 1000)
  }
}


export default reducer