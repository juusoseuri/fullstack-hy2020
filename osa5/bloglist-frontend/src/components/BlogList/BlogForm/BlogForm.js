import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Togglable from '../../Togglable'
import { showMessage } from '../../../reducers/notificationReducer'
import { createBlog } from '../../../reducers/blogReducer'


const BlogForm = () => {
  const blogFormRef = useRef()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    create({
      title: title,
      author: author,
      url: url,
    })

    setUrl('')
    setTitle('')
    setAuthor('')
  }

  // Adds a new blog to the data base and the frontend list
  const create = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(showMessage(`A new blog: ${blogObject.title} by ${blogObject.author} added!`, 3))
  }

  return (
    <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={url}
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Save the blog</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
