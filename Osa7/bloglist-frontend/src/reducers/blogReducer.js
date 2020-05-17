import blogService from '../services/blogs'


const reducer = (store = [], action) => {
  switch(action.type) {
    case 'CREATE_BLOG':
      return [...store, action.data]
    case 'REMOVE_BLOG':
      return store.filter(b => b.id !== action.data.id)
    case 'LIKE_BLOG':
      return store.map(b => b.id === action.data.id ? action.data : b)
    case 'INIT_BLOGS':
      return action.data
    default:
      return store
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.create(blog)

    dispatch({
      type: 'CREATE_BLOG',
      data
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.remove(blog.id)

    dispatch({
      type: 'REMOVE_BLOG',
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
      type: 'LIKE_BLOG',
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
      type: 'INIT_BLOGS',
      data
    })
  }
}

export default reducer