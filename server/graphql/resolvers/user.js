const User = require('../../models/User')
const { googleAuth } = require('../../util/authorization')
const { checkAuthorization } = require('../../util/auth')
const { UserInputError } = require('apollo-server')
const dayjs = require('dayjs')

const userResolvers = {
  Query: {
    getUsers: async () => {
      //get all users
      const users = await User.find({})
      if (users) {
        return users
      }
    },
  },
  Mutation: {
    googleAuth: async (_, { idToken }) => {
      //google login
      const { data, token } = await googleAuth(idToken)
      const { email, name } = data

      //DEMO - check number of users in database
      const users = await User.find({})
      users.sort(
        (a, b) =>
          a.registeredAt.replaceAll(/[-T:]/g, '') -
          b.registeredAt.replaceAll(/[-T:]/g, ''),
      )
      if (users.length >= 5) {
        const userToBeDeleted = await User.findByIdAndDelete(users[2]._id)
        await userToBeDeleted.delete()
      }
      //DEMO end

      const user = await User.findOne({ email })
      //if user exists, only token is passed to frontend
      //if user does not exist, new one is created
      if (!user) {
        const newUser = new User({
          email,
          name,
          username: email,
          registeredAt: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
          darkTheme: true,
        })
        await newUser.save()
        return {
          ...newUser._doc,
          id: newUser._id,
          token,
        }
      }
      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },
    changeName: async (_, args, context) => {
      //change of user name
      const currentUser = await checkAuthorization(context)
      if (!args.name) {
        throw new UserInputError('Name cannot be empty', {
          errors: 'Name cannot be empty',
        })
      }
      try {
        await User.findOneAndUpdate(
          { _id: currentUser._id },
          {
            $set: {
              name: args.name,
            },
          },
        )
        return `Previous name: ${currentUser.name}, new name: ${args.name}`
      } catch (err) {
        throw new Error(err)
      }
    },
    setTheme: async (_, args, context) => {
      //change theme(dark, light)
      const currentUser = await checkAuthorization(context)
      try {
        await User.findOneAndUpdate(
          { _id: currentUser._id },
          {
            $set: {
              darkTheme: args.darkTheme,
            },
          },
        )
        return 'Theme changed'
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}

module.exports = userResolvers
