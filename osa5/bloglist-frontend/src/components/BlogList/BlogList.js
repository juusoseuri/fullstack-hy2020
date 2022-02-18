import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog/Blog'
import BlogForm from './BlogForm/BlogForm'
import { voteBlog, removeBlog, initBlogs } from '../../reducers/blogReducer'
import { showErrorMessage, showMessage } from '../../reducers/notificationReducer'


const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  // Gets all the blogs
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])
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
      <br/>
      <BlogForm/>
      <br/>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog.id)}
          handleRemoval={() => handleRemoval(blog.id)}
        />
      ))}
    </div>
  )
}

export default BlogList