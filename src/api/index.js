import { Router } from 'express'
import users from './users'
import books from './books'
import middleware from '../middleware'

export default ({ db }) => {
  let api = Router()

  // middleware
  api.use(middleware({ db }))
  api.use('/users', users({ db }))
  api.use('/books', books({ db }))

  api.get('/', (req, res) => res.sendStatus(200))
  return api
}