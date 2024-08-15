const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function (next) {
  if (this.isModified('passwordHash')) {
    const saltRounds = 10
    this.passwordHash = await bcrypt.hash(this.passwordHash, saltRounds)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
