import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useParams, useHistory } from 'react-router-dom'

import NewComment from './NewComment'

import { notify } from '../reducers/notificationReducer'
import {
  createBlog, initializeBlogs, likeBlog, removeBlog
} from '../reducers/blogReducer'

import {
  createComment, initializeComments
} from '../reducers/commentReducer'

const ReduxBlog = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const history = useHistory()

  const blogs = useSelector(state => state.blogs)

  if (blogs.length === 0) return null

  const comments = useSelector(state => state.comments)
  const user = useSelector(state => state.user)

  const blog = blogs.find(blog => blog.id === id)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    dispatch(initializeComments(blog))
  }, [dispatch])

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    
    if (ok) {
      dispatch(removeBlog(blogToRemove))

      history.push('/')
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    dispatch(likeBlog(blogToLike))
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author}
      </div>
      <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={() => handleLike(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username &&<button onClick={() => handleRemove(blog.id)}>remove</button>}
      </div>
      <div>
        <NewComment blog={blog}/>
      </div>
      <div>
        <h3>Comments</h3>
        <ul>
          {comments.map(comment => {
            return (
              <li key={comment.id}>
                {comment.content}
              </li>
            )}
          )}
        </ul>
      </div>
    </div>
  )
}

export default ReduxBlog