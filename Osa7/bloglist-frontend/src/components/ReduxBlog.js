import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { List, ListItem, Wrapper, Title, SecondHeader, Button } from '../styles'

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
    <Wrapper>
      <Wrapper>
        <Title>
          <b>{blog.title}</b> <i style={{fontWeight: 'normal'}}>by {blog.author}</i>
        </Title>
      </Wrapper>
      <div>
        <div>url: {blog.url}</div>
        <div>added by {blog.user.username}</div>
        <div>{blog.likes} likes</div>
        <div>
          <Button onClick={() => handleLike(blog.id)}>like</Button>
          {user.username === blog.user.username &&
            <Button onClick={() => handleRemove(blog.id)}>remove</Button>}
        </div>
      </div>
      <div>
        <NewComment blog={blog}/>
      </div>
      <div>
        <SecondHeader>Comments</SecondHeader>
        <List>
          {comments.map(comment => {
            return (
              <ListItem key={comment.id}>
                {comment.content}
              </ListItem>
            )}
          )}
        </List>
      </div>
    </Wrapper>
  )
}

export default ReduxBlog