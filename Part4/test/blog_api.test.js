const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Author One',
    url: 'http://example.com/1',
    likes: 1
  },
  {
    title: 'Second Blog',
    author: 'Author Two',
    url: 'http://example.com/2',
    likes: 2
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
}, 20000) // Increase timeout to 20 seconds

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 20000) // Increase timeout to 20 seconds

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
}, 20000) // Increase timeout to 20 seconds

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(r => r.id)
  ids.forEach(id => {
    expect(id).toBeDefined()
  })
}, 20000) // Increase timeout to 20 seconds

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'Author Three',
    url: 'http://example.com/3',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('New Blog')
}, 20000) // Increase timeout to 20 seconds

afterAll(async () => {
  await mongoose.connection.close()
}, 20000) // Increase timeout to 20 seconds
