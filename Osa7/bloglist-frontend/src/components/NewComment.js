import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Form, Input, Wrapper, Title, ThirdHeader, Button } from '../styles'


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
      <Form onSubmit={handleNewComment}>
        <div>
          <Input
            id='content'
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
          <Button id="create">add comment</Button>
        </div>
      </Form>
    </div>
  )
}

export default NewComment