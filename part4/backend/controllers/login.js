const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body // sent from frontend login form

  const user = await User.findOne({ username }) // find user in database by username, if it exists, then compare password hashes
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash) // compare password transformed to hash with the hash stored in database

  if (!(user && passwordCorrect)) { // if one or both of these are false, return error
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter