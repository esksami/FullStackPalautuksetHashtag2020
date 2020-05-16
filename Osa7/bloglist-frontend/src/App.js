import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect,
  useHistory
} from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'

import { notify } from './reducers/notificationReducer'
import { loginUser, logoutUser, loadUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import {
  createBlog, initializeBlogs, likeBlog, removeBlog
} from './reducers/blogReducer'


const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    
    if (ok) {
      dispatch(removeBlog(blogToRemove))
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    dispatch(likeBlog(blogToLike))
  }

  const createNewBlog = (blog) => {
    try {
      dispatch(createBlog(blog))

      blogFormRef.current.toggleVisibility()

      dispatch(notify(`a new blog '${blog.title}' by ${blog.author} added!`, 'success', 4))
    } catch(exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createNewBlog} />
      </Togglable>

      {blogs.sort(byLikes).map(blog => {
        return (<Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===(blog.user && blog.user.username)}
        />)}
      )}
    </div>)
}

const LogIn = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const cantAccessUserVariableFromHereHmmm = await dispatch(loginUser(username, password))

      const frickingfrick = cantAccessUserVariableFromHereHmmm

      //console.log('user at login always null', user)

      setUsername('')
      setPassword('')

      history.push('/')

      dispatch(notify(`${frickingfrick.username} welcome back!`, 'success', 4))
    } catch(exception) {
      dispatch(notify('wrong username/password', 'error', 4))
    }
  }

  return (
    <div>
      <h2>login to application</h2>

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

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>blogs created</th>
        </tr>
      {users.map(user => {
        return (
          <tr>
            <td>{user.username}</td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      )}
      </table>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      <Notification notification={notification} />
      {user && <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>}
      <Switch>
        <Route path='/login'>
          <LogIn/>
        </Route>
        <Route path='/users'>
          <Users/>
        </Route>
        <Route path='/'>
          {user ? <Blogs/> : <Redirect to='/login'/>}
        </Route>
      </Switch>
    </div>
  )
}

export default App