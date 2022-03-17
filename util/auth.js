const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')
const User = require('../models/User')

const checkAuthorization = async context => {
  const auth = context ? context.req.headers.authorization : null

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    try {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET_KEY)
      const currentUser = await User.findById(decodedToken.id)
      return currentUser
    } catch (err) {
      throw new AuthenticationError('Invalid/Expired token')
    }
  }
  throw new Error(
    'Authentication token is not structured correctly or is not provided',
  )
}

const generateToken = user => {
  const SECRET_KEY = process.env.SECRET_KEY
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: '1h' },
  )
}

module.exports = { generateToken, checkAuthorization }
