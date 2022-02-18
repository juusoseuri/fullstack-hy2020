import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'VOTE': {
    const blog = action.data
    return (
      state.map(item => item.id !== blog.id ? item : blog)
        .sort((a, b) => b.likes - a.likes)
    )
  }
  case 'NEW_BLOG': {
    return [...state, action.data]
  }
  case 'REMOVE': {
    return (
      state.filter(item => item.id !== action.data)
    )
  }
  case 'INIT': {
    return action.data
  }
  default:
    return state
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService._delete(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}

export const voteBlog = (blog) => {
  return async dispatch => {
    const updated = await blogService.update(blog.id, blog)
    dispatch({
      type: 'VOTE',
      data: updated
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sorted = blogs.sort(
      (first, second) => second.likes - first.likes
    )
    dispatch({
      type: 'INIT',
      data: sorted
    })
  }
}

export default blogReducer