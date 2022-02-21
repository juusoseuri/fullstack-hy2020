import React from 'react'

const User = ({ user, blogs }) => {
  if (!user) {
    return null
  }

  const userBlogs = blogs.filter(blog => blog.user.id === user.id)

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Blogs created:</h4>
      {userBlogs.map(blog => (
        <li key={blog.id}>
          {blog.title}
        </li>
      ))}
    </div>
  )
}

export default User