import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('uniikkinimi')
  const [password, setPassword] = useState('salasana')

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  // Gets all the blogs
  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sorted = blogs.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
      setBlogs( sorted )
    })
  }, [])

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

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setMessage(`A new blog: ${blogObject.title} by ${blogObject.author} added!`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const blogForm = () => (
    <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  // Handles login from the loginForm
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      await blogService.update(id, changedBlog)
      blogService.getAll().then(blogs => {
        const sorted = blogs.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
        setBlogs( sorted )
      })
    } catch (exception) {
      setErrorMessage(
        `Blog '${blog.title}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Handles removal of a blog
  const handleRemoval = async (id) => {
    const blog = blogs.find(n => n.id === id)
    if (window.confirm(`Delete blog: ${blog.title}`)) {
      console.log('Blog deleted', { blog })
      const returned = await blogService._delete(id)
      console.log('returned', returned)
      setMessage(
        `${blog.title} has been deleted`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs => blogs.filter(n => n.id !== id))
    }
  }

  return(
    <div>
      <h2>Blogs</h2>

      <Notification message={message}/>
      <Error message={errorMessage}/>

      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        /> :
        <div>
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </div>
          <br/>
          {blogForm()}
          <br/>
          {blogs.map(blog =>
            <Blog key={blog.id}
              blog={blog}
              handleLike={() => handleLike(blog.id)}
              handleRemoval={() => handleRemoval(blog.id)}/>
          )}
        </div>
      }
    </div>
  )
}

export default App