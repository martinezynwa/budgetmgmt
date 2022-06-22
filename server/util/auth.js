const jwt_decode = require('jwt-decode')
const { AuthenticationError } = require('apollo-server')
const User = require('../models/User')

//auth check making sure that only registered users can access the app
const checkAuthorization = async context => {
  const auth = context ? context.req.headers.authorization : null
  //checking token format
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    try {
      const decodedToken = jwt_decode(auth.substring(7)) //decoding token
      const { email } = decodedToken
      const currentUser = await User.findOne({ email })
      return currentUser
    } catch (err) {
      throw new AuthenticationError('Invalid/Expired token')
    }
  }
  throw new Error(
    'Authentication token is not structured correctly or is not provided',
  )
}

module.exports = { checkAuthorization }
