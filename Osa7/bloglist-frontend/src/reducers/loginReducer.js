import loginService from '../services/login'
import storage from '../utils/storage'


const reducer = (store = [], action) => {
  switch(action.type) {
    case 'SET':
      return action.user
    case 'LOGOUT':
      return null
    default:
      return store
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })

    storage.saveUser(user)

    dispatch({
      type: 'SET',
      user
    })

    return user
  }
}


export const loadUser = () => {
  return async dispatch => {
    const user = storage.loadUser()

    dispatch({
      type: 'SET',
      user
    })

    return user
  }
}

export const logoutUser = () => {
  return async dispatch => {
    storage.logoutUser()

    dispatch({
      type: 'LOGOUT'
    })
  }
}


export default reducer