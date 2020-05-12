import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'

import { notify } from './reducers/notificationReducer'
import { createBlog, initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer'


const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

/*  console.log('blogs:', blogs)
*/
/*  const [oldBlogs, setBlogs] = useState([])
*/
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
/*    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )*/
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const notifyWith = (message, type='success') => {
    dispatch(notify(message, type, 4))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      console.log(user)

      setUsername('')
      setPassword('')
      setUser(user)
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createNewBlog = (blog) => {
    try {
      dispatch(createBlog(blog))
/*      const newBlog = await blogService.create(blog)
*/    
      blogFormRef.current.toggleVisibility()
/*      setBlogs(blogs.concat(newBlog))
*/      
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    dispatch(likeBlog(blogToLike))
/*    
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    setBlogs(blogs.map(b => b.id === id ?  { ...blogToLike, likes: blogToLike.likes + 1 } : b))*/
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    
    if (ok) {
      dispatch(removeBlog(blogToRemove))
/*      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))*/
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createNewBlog} />
      </Togglable>

      {blogs.sort(byLikes).map(blog => {
/*        console.log('blog', blog)
        console.log('user', user)*/
        return (<Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===(blog.user && blog.user.username)}
        />)}
      )}
    </div>
  )
}

export default App