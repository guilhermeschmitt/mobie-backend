import Service from './Service'

import request from 'request-promise'
import { Book } from '../models'

const rp = request.defaults({ 'proxy': 'http://192.168.0.254:3128' })
export class BookService extends Service {
  constructor(db) {
    super(db)
    this.bookRepo = this.db.getRepository(Book)
  }

  async save(book) {
    return this.bookRepo.save(book)
  }

  async findById(id) {
    return this.bookRepo.findOneById(id, { relations: ["authors", "genre"] })
  }

  async searchBook(attr, { limit = 50, offset = 0 } = {}) {
    const query = Object.getOwnPropertyNames(attr).length > 0 ? "LOWER(book.title) LIKE LOWER(:title) OR book.isbn LIKE :isbn" : ''
    return this.bookRepo.createQueryBuilder("book")
      .where(query)
      .take(limit)
      .skip(offset)
      .orderBy("book.title", "ASC")
      .setParameters({ title: `%${attr.title}%`, isbn: `%${attr.isbn}%` })
      .getMany()
  }

  async teste(){
    return rp('https://www.googleapis.com/books/v1/volumes?q=the%20gunslinger')
    .then(function (a) {
       return a
    })
  }

}