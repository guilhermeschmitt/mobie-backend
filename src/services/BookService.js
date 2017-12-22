import _ from 'lodash'
import Service from '@/services/Service'
const ER_BAD_FIELD_ERROR = 'ER_BAD_FIELD_ERROR'

export default class extends Service {
  constructor(db) {
    super(db)
    this.Book = this.db.Book
  }

  async save(book) {
    return this.Book.create(book)
  }

  async findById(id = -1) {
    return this.Book.findById(id)
  }

  async searchBook(attr, { limit = 50, offset = 0, simple = true } = {}) {
    const compacted = _.pickBy(attr)
    Object.keys(compacted).forEach(el => compacted[el] = { $like: `%${compacted[el]}%` })
    return this.Book.findAll({
      where: { $and: compacted },
      include: simple ? undefined : [{ model: this.db.Author }],
      order: ['title'],
      limit,
      offset
    }).catch(error => {
      if (error.original.code === ER_BAD_FIELD_ERROR)
        return []
    })
  }

}