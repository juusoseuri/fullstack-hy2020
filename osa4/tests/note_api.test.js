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

  test('identifier field is called id', async () => {
    const response = await api.get('/api/blogs')

    const fetchIds = response.body.map(r => r.id)

    expect((fetchIds)).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('length grows with one', async() => {
    const newBlog = {
      title: 'Keissiiiii',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain('Keissiiiii')
  })

  test('set likes to zero if undefined', async() => {
    const newBlog = {
      title: 'Keissiiiii',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const lastElementLikes = blogsAtEnd[blogsAtEnd.length - 1].likes

    expect(lastElementLikes).toBe(0)

  })
})

afterAll(() => {
  mongoose.connection.close()
})