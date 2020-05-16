import userService from '../services/users'


const reducer = (store = [], action) => {
  switch(action.type) {
    case 'INIT':
      return action.data
    default:
      return store
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const data = await userService.getAll()
    console.log('users.data:', data)

    dispatch({
      type: 'INIT',
      data
    })
  }
}

export default reducer