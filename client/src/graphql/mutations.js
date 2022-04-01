import { gql } from 'graphql-tag'

const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $name: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    registerUser(
      registerInput: {
        username: $username
        name: $name
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      id
      username
      name
      email
      token
      registeredAt
    }
  }
`

const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
      name
      email
      token
      registeredAt
    }
  }
`
export { REGISTER_USER, LOGIN_USER }
