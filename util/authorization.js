const { OAuth2Client } = require('google-auth-library')
const jwt_decode = require('jwt-decode')
require('dotenv').config()

const googleAuth = async idToken => {
  if (!idToken) {
    return 'No token provided'
  }
  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'postmessage',
  )
  const { tokens } = await oAuth2Client.getToken(idToken)
  const token = tokens.id_token
  const data = jwt_decode(tokens.id_token)
  return { data, token }
}

module.exports = { googleAuth }
