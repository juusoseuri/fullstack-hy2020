import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import './index.css'
import { showErrorMessage } from './reducers/notificationReducer'
import BlogList from './components/BlogList/BlogList'
import { useDispatch } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const dispatch = useDispatch()


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
          <BlogList/>
        </div>
      )}
    </div>
  )
}

export default App
