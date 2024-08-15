const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(express.static('dist'))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login',loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
