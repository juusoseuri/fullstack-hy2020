import React from 'react'

const LoginForm = (props) => (
  <div>
    <h2>Log in to the application</h2>
    <form onSubmit={props.handleLogin}>
      <div>
        Username
        <input
          type="text"
          value={props.username}
          id="username"
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="text"
          value={props.password}
          id="password"
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <button type="submit" id="loginButton">
        login
      </button>
    </form>
  </div>
)

export default LoginForm
