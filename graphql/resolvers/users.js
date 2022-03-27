const bcrypt = require('bcryptjs')
const { UserInputError } = require('apollo-server')
const User = require('../../models/User')

const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../util/validators')
const { generateToken } = require('../../util/auth')

const usersResolvers = {
  Query: {},

  Mutation: {
    registerUser: async (
      _,
      { registerInput: { username, name, password, confirmPassword, email } },
    ) => {
      const { valid, errors } = validateRegisterInput(
        username,
        password,
        confirmPassword,
        email,
      )
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const userCheck = await User.findOne({ username })
      const emailCheck = await User.findOne({ email })

      if (userCheck) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        })
      }
      if (emailCheck) {
        throw new UserInputError('Email is in the database already', {
          errors: {
            email: 'This email has been used',
          },
        })
      }

      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        username,
        name,
        email,
        password,
        registeredAt: new Date().toISOString(),
      })
      const generatedUser = await newUser.save()

      return {
        ...generatedUser._doc,
        id: generatedUser._id,
      }
    },

    loginUser: async (_, { username, password }) => {
      const { errors, valid } = validateLoginInput(username, password)

      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const user = await User.findOne({ username })

      if (!user) {
        errors.general = 'User not found'
        throw new UserInputError('User not found', { errors })
      }

      const match = await bcrypt.compare(password, user.password)

      if (!match) {
        errors.general = 'Wrong password'
        throw new UserInputError('Wrong password', { errors })
      }

      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },
  },
}

module.exports = usersResolvers
