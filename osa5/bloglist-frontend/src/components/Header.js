import React from 'react'
import Notification from './Notification'
import Error from './Error'

const Header = () => {
  return (
    <div>
      <Notification/>
      <Error/>
      <h2>Blogs</h2>
    </div>
  )
}

export default Header