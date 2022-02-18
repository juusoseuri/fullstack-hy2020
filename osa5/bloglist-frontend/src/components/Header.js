import React from 'react'
import Notification from './Notification'
import Error from './Error'

const Header = () => {
  return (
    <div>
      <h2>Blogs</h2>
      <Notification/>
      <Error/>
    </div>
  )
}

export default Header