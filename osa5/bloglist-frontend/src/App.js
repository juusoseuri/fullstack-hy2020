import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import Togglable from './components/Togglable'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorMessage, showMessage } from './reducers/notificationReducer'
import { createBlog, initBlogs, removeBlog, voteBlog } from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  // Gets all the blogs
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  // Gets the user from window.localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Adds a new blog to the data base and the frontend list
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(showMessage(`A new blog: ${blogObject.title} by ${blogObject.author} added!`, 3))
  }

  // Component for adding the form of adding new blogs
  const blogForm = () => (
    <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  // Handles login from the loginForm
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showErrorMessage('Wrong username or password!', 3))
      console.log('exception:', exception)
    }
  }

  // Handles the logout event
  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out')
    await window.localStorage.removeItem('loggedBlogappUser')
  }

  // Handles new likes
  const handleLike = async (id) => {
    const blog = blogs.find((n) => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(voteBlog(changedBlog))
    } catch (exception) {
      dispatch(showErrorMessage(`Blog '${blog.title}' was already removed from server`, 3))
    }
  }

  // Handles removal of a blog
  const handleRemoval = async (id) => {
    const blog = blogs.find((n) => n.id === id)
    if (window.confirm(`Delete blog: ${blog.title}`)) {
      console.log('Blog deleted', { blog })
      await dispatch(removeBlog(id))
      dispatch(showMessage(`${blog.title} has been deleted`, 3))
    }
  }

  return (
    <div>

      <Header/>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </div>
          <br />
          {blogForm()}
          <br />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={() => handleLike(blog.id)}
              handleRemoval={() => handleRemoval(blog.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
