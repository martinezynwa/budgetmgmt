import React from 'react'
import App from './App'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client'

const httpLink = new HttpLink({ uri: 'http://localhost:3001' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
