import _ from 'lodash'
import Service from './Service'
import { Book } from '../models'

export class BookService extends Service {
  constructor(db) {
    super(db)
    this.bookRepo = this.db.getRepository(Book)
  }

  async save(book) {
    return this.bookRepo.save(book)
  }

  async findById(id) {
    return this.bookRepo.findOneById(id,  { relations: ["authors", "genre"] })
  }

  async searchBook(attr, { limit = 50, offset = 0, simple = false } = {}) {
    const compacted = _.pickBy(attr)
    Object.keys(compacted).forEach(el => compacted[el] = { $like: `%${compacted[el]}%` })
    return this.Book.findAll({
      where: { $and: compacted },
      include: simple ? undefined : [{ model: this.db.Author }],
      order: ['title'],
      limit,
      offset
    }).catch(err => {
      if (err.name === 'SequelizeDatabaseError')
        return []
      else  
        throw err
    })
  }

}