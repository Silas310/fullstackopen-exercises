const User = require('../models/userSchema')

const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    passwordHash: ''
  },
  {
    username: 'silas',
    name: 'Silas Costa',
    passwordHash: ''
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUsers,
  usersInDb
}