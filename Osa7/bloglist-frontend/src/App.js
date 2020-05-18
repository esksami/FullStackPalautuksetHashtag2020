import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link, NavLink, Redirect,
  useHistory, useRouteMatch, useParams
} from 'react-router-dom'

import {
  Form, Input, List, ListItem, Title, SecondHeader, ThirdHeader, 
  Wrapper, Navigation, NavItem, Button, StyledLink
} from './styles'

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
        <Title>
          Blogs
        </Title>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createNewBlog} />
      </Togglable>
      <List>
        {blogs.sort(byLikes).map(blog => {
          return (
            <ListItem key={blog.id}>
              <StyledLink to={`/blogs/${blog.id}`}>{blog.title}</StyledLink>
            </ListItem>
          )}
        )}
      </List>
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
      <Title>Login</Title>

      <Form onSubmit={handleLogin}>
        <div>
          <label for="username">Username</label>
          <Input
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label for="username">Password</label>
          <Input
            id='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button id='login'>login</Button>
      </Form>
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
      <Title>Users</Title>
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
      <Title>{user.username}</Title>

      <ThirdHeader>Added blogs</ThirdHeader>

      <List>
        {user.blogs.map(blog => {
          return (
            <ListItem key={blog.id}>
              <StyledLink to={`/blogs/${blog.id}`}>{blog.title}</StyledLink>
            </ListItem>
          )}
        )}
      </List>
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
      <Navigation>
        <NavItem to="/blogs">Blogs</NavItem>
        <NavItem to="/users">Users</NavItem>
      </Navigation>
      {user &&
        <div style={{float: 'right'}}>
          <span>Logged in as <b>{user.username}</b></span>
          <Button onClick={handleLogout}>Logout</Button>
        </div>}
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
        <Route path='/blogs'>
          {user ? <Blogs/> : <Redirect to='/login'/>}
        </Route>
        <Route path='/'>
          <Redirect to='/blogs'/>
        </Route>
      </Switch>
    </div>
  )
}

export default App