const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

test('creation succeeds with a fresh username', async () => {
  const usersAtStart = await api.get('/api/users')

  const newUser = {
    username: 'newuser',
    name: 'New User',
    password: 'password123'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await api.get('/api/users')

  expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length + 1)
  const usernames = usersAtEnd.body.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

test('creation fails with a short password', async () => {
  const newUser = {
    username: 'shortpassworduser',
    name: 'Short Password User',
    password: '12'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})
