import { Router } from 'express'
import {BookService} from '../services/BookService'

export default () => {
  const books = Router()
  const service = new BookService()

  books.get('/', async (req, res) => {
    const { query } = req.query
    const limit = parseInt(req.query.limit, 10) || undefined
    const offset = parseInt(req.query.offset, 10) || undefined
    return res.json(await service.searchBook(query, { limit, offset })) 
  })

  books.get('/:id', (req, res) => {
    service.findById(req.params.id).then(book => {
      (!book) ? res.sendStatus(404) : res.json(book)
    })
  })

  books.post('/', (req, res) => {
    service.save(req.body).then(book => res.json(book))
  })

  return books
}
