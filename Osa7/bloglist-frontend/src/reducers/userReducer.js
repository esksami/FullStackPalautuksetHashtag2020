import userService from '../services/users'


const reducer = (store = [], action) => {
  switch(action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return store
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const data = await userService.getAll()

    dispatch({
      type: 'INIT_USERS',
      data
    })
  }
}

export default reducer