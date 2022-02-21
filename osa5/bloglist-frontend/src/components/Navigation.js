import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = ( props ) => {
  const navButtonStyle = {
    paddingRight: 10
  }

  const navStyle = {
    borderStyle: 'solid',
    display: 'inline-block',
    padding: 5,
    marginBottom: 10,
    backgroundColor: 'lightgrey'
  }

  return (
    <div>
      <nav style={navStyle}>
        <Link style={navButtonStyle} to={'/'}>Blogs</Link>
        <Link style={navButtonStyle} to={'/users'}>Users</Link>
        <div style={{ display: 'inline' }}>{props.user.name} logged in</div>
        <button style={{ marginLeft: 5 }}onClick={props.handleLogout}>Logout</button>
      </nav>
    </div>
  )
}

export default Navigation