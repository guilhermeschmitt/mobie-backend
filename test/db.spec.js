import { describe, it, beforeEach } from 'mocha'
import should from 'should'
import IntegrationTest from './IntegrationTest'
import { Author, Book, Genre } from '../src/models/'

describe('DB Model', function () {
  let conn = undefined

  beforeEach(async () => {
    conn = await IntegrationTest(this)
  })

  it('book => relationships', async () => {
    const genre = new Genre()
    genre.name = 'Horror'

    const author = new Author()
    author.name = 'author'
    await conn.getRepository(Genre).save(genre)
    await conn.getRepository(Author).save(author)

    const book = new Book()
    book.title = "It"
    book.isbn = "111"
    book.authors = [author]
    book.releaseDate = new Date()
    book.genre = genre

    const savedBook = await conn.getRepository(Book).save(book)

    const foundBook = await conn.getRepository(Book).findOneById(savedBook.id, { relations: ["authors", "genre"] })
    should.equal(foundBook.title, book.title)
    should.equal(foundBook.isbn, book.isbn)
    should.equal(foundBook.releaseDate.toString(), book.releaseDate.toString())
    should.equal(foundBook.genre.name, genre.name)
    should.equal(foundBook.authors[0].name, author.name)
  })
})