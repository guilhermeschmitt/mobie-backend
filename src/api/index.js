import { Router } from 'express'
// import users from './users'
import books from './books'
import middleware from '../middleware'

export default ({ config, db }) => {
  let api = Router()

  // middleware
  api.use(middleware({ config, db }))
  // api.use('/users', users({ config, db }))
  api.use('/books', books({ config, db }))

  api.get('/', (req, res) => res.sendStatus(200))
  return api
}