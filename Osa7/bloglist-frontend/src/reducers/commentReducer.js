import commentService from '../services/comments'


const reducer = (store = [], action) => {
  switch(action.type) {
    case 'CREATE_COMMENT':
      return [...store, action.data]
    case 'INIT_COMMENTS':
      return action.data
    default:
      return store
  }
}

export const createComment = (blog, comment) => {
  return async dispatch => {
    const data = await commentService.create(blog.id, comment)

    dispatch({
      type: 'CREATE_COMMENT',
      data
    })
  }
}

export const initializeComments = (blog) => {
  return async dispatch => {
    const data = await commentService.getAll(blog.id)

    dispatch({
      type: 'INIT_COMMENTS',
      data
    })
  }
}

export default reducer