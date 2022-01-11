const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'maino',
      name: 'mainio luukku',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails if username already taken', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'yoooo',
      password: 'ayylmao'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('content-type', /application\/json/)

    expect(res.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if the password is too short', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'uniikki',
      name: 'yoo',
      password: 'as'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('content-type', /application\/json/)

    const end = await helper.usersInDb()
    expect(end).toHaveLength(usersAtStart.length)
  })

  test('creation fails if password or username does not exist', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'yoo',
      password: 'keissii'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('content-type', /application\/json/)

    const firstEnd = await helper.usersInDb()
    expect(firstEnd).toHaveLength(usersAtStart.length)

    const secondUser = {
      username: 'keissii',
      name: 'yoo'
    }

    await api
      .post('/api/users')
      .send(secondUser)
      .expect(400)
      .expect('content-type', /application\/json/)

    const secondEnd = await helper.usersInDb()
    expect(secondEnd).toHaveLength(usersAtStart.length)

  })

})

afterAll(() => {
  mongoose.connection.close()
})