import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemoval }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    blogVisible ? setBlogVisible(false) : setBlogVisible(true)
  }

  const BlogHeading = () => {
    if (blogVisible) {
      return (
        <div>
          {blog.title} by {blog.author}
          <button onClick={() => setBlogVisible(false)}>hide</button>
        </div>
      )
    }
    return (
      <div>
        {blog.title} by {blog.author}
        <button onClick={() => setBlogVisible(true)}>view</button>
      </div>
    )
  }

  if (blogVisible) {
    return (
      <div style={blogStyle} className="blog">
        <div onClick={() => toggleVisibility()}>
          <BlogHeading />
        </div>
        <div>
          <div>{blog.url}</div>
          <div>{blog.user.name}</div>
          <div>
            Likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <button onClick={handleRemoval}>remove</button>
        </div>
      </div>
    )
  }
  return (
    <div style={blogStyle} className="blog">
      <div onClick={() => toggleVisibility()}>
        <BlogHeading />
      </div>
    </div>
  )
}

export default Blog
