const bcrypt = require('bcryptjs')
const User = require('../models/user')
const express = require('express')
const router = express.Router()


router.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!password || password.length < 3) {
    return res.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})


router.get('/', async (req, res) => {
  const users = await User.find({}).select('-passwordHash')
  res.json(users)
})

module.exports = router
