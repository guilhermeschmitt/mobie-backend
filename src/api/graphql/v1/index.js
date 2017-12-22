import { Router } from 'express'
// import middleware from '@/middleware'

import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!'
  },
}

export default ({ config, db }) => {
  let api = Router()
    api.get('/ping', (req, res) => {
      res.json(req.query)
    })

  api.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false,
  }))

  return api
}