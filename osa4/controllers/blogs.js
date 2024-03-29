const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const user = request.user

  if (!request.token && !jwt.verify(!request.token, process.env.SECRET).id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogRouter.get('/:id', async (request, response) => {
  const person = await Blog.findById(request.params.id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter