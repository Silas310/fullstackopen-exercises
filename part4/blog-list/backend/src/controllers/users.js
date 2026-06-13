const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/userSchema')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1});
  response.json(users);
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  
  if (!password || password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long'
    })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const result = await user.save()
  response.status(201).json(result)
})


usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users)
})


module.exports = usersRouter