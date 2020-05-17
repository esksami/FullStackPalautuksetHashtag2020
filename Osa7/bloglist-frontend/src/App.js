import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect,
  useHistory, useRouteMatch, useParams
} from 'react-router-dom'

import ReduxBlog from './components/ReduxBlog'
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

  const createNewBlog = (blog) => {
    try {
      dispatch(createBlog(blog))

      blogFormRef.current.toggleVisibility()

      dispatch(notify(
        `a new blog '${blog.title}' by ${blog.author} added!`, 'success', 4
      ))
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
      <ul>
        {blogs.sort(byLikes).map(blog => {
          return (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          )}
        )}
      </ul>
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
      const cantAccessUserVariableFromHereHmmm = await dispatch(
        loginUser(username, password)
      )

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
        <thead>
          <tr>
            <th>Name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
        {users.map(user => {
          return (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        )}
        </tbody>
      </table>
    </div>
  )
}


const User = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)

  const user = users.find(user => user.id === id)

  return (
    <div>
      <h2>{user.username}</h2>

      <h3>Added blogs</h3>

      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())

    history.push('/login')
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Notification notification={notification} />
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
      </div>
      {user && <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>}
      <Switch>
        <Route path="/users/:id">
          <User/>
        </Route>
        <Route path="/blogs/:id">
          <ReduxBlog/>
        </Route>
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