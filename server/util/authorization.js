const { OAuth2Client } = require('google-auth-library')
const jwt_decode = require('jwt-decode')
require('dotenv').config()

//handling google login
const googleAuth = async idToken => {
  if (!idToken) {
    return 'No token provided'
  }

  //using env values to complete authentication with Google OAuth client
  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'postmessage',
  )

  //decoding token for frontend
  const { tokens } = await oAuth2Client.getToken(idToken)
  const token = tokens.id_token
  const data = jwt_decode(tokens.id_token)
  return { data, token }
}

module.exports = { googleAuth }
