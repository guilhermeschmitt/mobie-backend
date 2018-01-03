import Service from './Service'
import qs from 'query-string'
import request from 'request-promise'
import { Book } from '../models'

export class BookService extends Service {
  constructor(db) {
    super(db)
    this.bookRepo = this.db.getRepository(Book)
  }

  convertToBook(parsed) {
    return {
      id: parsed.id,
      title: parsed.volumeInfo.title,
      subtitle: parsed.volumeInfo.subtitle,
      authors: parsed.volumeInfo.authors,
      publishedDate: parsed.volumeInfo.publishedDate,
      description: parsed.volumeInfo.description,
      pageCount: parsed.volumeInfo.pageCount,
      categories: parsed.volumeInfo.categories,
      industryIdentifiers: parsed.volumeInfo.industryIdentifiers,
      imageLinks: parsed.volumeInfo.imageLinks,
      language: parsed.volumeInfo.language
    }
  }

  async findById(id) {
    const json = await request.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
    const parsed = JSON.parse(json)
    return this.convertToBook(parsed)
  }

  async searchBook(query, { limit = 20, offset = 0 } = {}) {
    const args = { q: query, startIndex: offset, maxResults: limit, printType: 'books', projection: 'lite' }
    const json = await request.get(`https://www.googleapis.com/books/v1/volumes?${qs.stringify(args)}`)
    const parsed = JSON.parse(json)
    return {
      totalItems: parsed.totalItems,
      items: parsed.items.map(el => this.convertToBook(el))
    }
  }

  async teste() {
    return request('https://www.googleapis.com/books/v1/volumes?q=the%20gunslinger')
      .then(function (a) {
        return a
      })
  }

}