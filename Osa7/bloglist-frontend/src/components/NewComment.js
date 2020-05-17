import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  createComment
} from '../reducers/commentReducer'

const NewComment = ({ blog }) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  const handleNewComment = (event) => {
    event.preventDefault()

    dispatch(createComment(blog, { content }))

    setContent('')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleNewComment}>
        <div>
          <input
            id='content'
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
          <button id="create">add comment</button>
        </div>
      </form>
    </div>
  )
}

export default NewComment