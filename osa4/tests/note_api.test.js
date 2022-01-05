const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('field id is id', async () => {
    const response = await api.get('/api/blogs')

    const fetchIds = response.body.map(r => r.id)

    expect((fetchIds)).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})