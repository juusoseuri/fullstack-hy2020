import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import './index.css'
import { showErrorMessage } from './reducers/notificationReducer'
import BlogList from './components/BlogList/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import Users from './components/Users/Users'
import User from './components/Users/User/User'
import Navigation from './components/Navigation'
import { initBlogs } from './reducers/blogReducer'

import {
  Routes,
  Route,
  useMatch
} from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  // Get the blogs
  const blogs = useSelector(state => state.blogs)
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  // Handle the formatting for the page users
  const users = blogs.map(blog => blog.user)
  const uniques = [...new Set(users.map(item => item.username))]
  const usersAndBlogCount = uniques.map(user => {
    const container = {}
    container['username'] = user
    container['name'] = users.find(n => user === n.username).name
    container['blogCount'] = blogs.filter(blog => blog.user.username === user).length
    container['id'] = users.find(n => user === n.username).id
    return container
  })

  // Gets the user from window.localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  const match = useMatch('/users/:id')
  const matchUser = match
    ? usersAndBlogCount.find(user => user.id === match.params.id)
    : null

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
          <Navigation user={user} handleLogout={handleLogout}/>
          <Routes>
            <Route path='/' element={<BlogList/>}/>
            <Route path='/users/:id' element={<User user={matchUser} blogs={blogs}/>}/>
            <Route path='/users' element={<Users usersAndBlogCount={usersAndBlogCount}/>}/>
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
