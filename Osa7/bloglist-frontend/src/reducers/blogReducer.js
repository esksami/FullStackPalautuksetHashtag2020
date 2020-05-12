import blogService from '../services/blogs'


const reducer = (store = [], action) => {
  switch(action.type) {
    case 'CREATE':
      return [...store, action.data]
    case 'REMOVE':
      return store.filter(b => b.id !== action.data.id)
    case 'LIKE':
      return store.map(b => b.id === action.data.id ? action.data : b)
    case 'INIT':
      return action.data
    default:
      return store
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.create(blog)

    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.remove(blog.id)

    dispatch({
      type: 'REMOVE',
      data: blog
    })
  }
}


export const likeBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })

    dispatch({
      type: 'LIKE',
      data
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    console.log('data:', data)
    console.log('data[0]:', data[0])

    dispatch({
      type: 'INIT',
      data
    })
  }
}

export default reducer