import { describe, it, beforeEach, afterEach } from 'mocha'
import should from 'should'
import { createDb } from '../IntegrationTest'
import { BookService } from '../../src/services/BookService'

describe('BookService', function () {
  let conn = undefined
  let bookService = undefined

  const book1 = { title: 'The Gunslinger', release: new Date(), isbn: '111' }
  const book2 = { title: 'It', release: new Date(), isbn: '222' }

  beforeEach(async () => {
    conn = await createDb(this)
    bookService = new BookService(conn)
  })

  afterEach(async () => {
    await conn.close()
  })

  it('book => should save', async () => {
    const savedBook = await bookService.save(book1)
    should.exists(savedBook.id)
  })

  it('find => by id', async () => {
    const saved = await bookService.save(book1)
    const found = await bookService.findById(saved.id)
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.title, 'The Gunslinger')
    should.equal(found.isbn, '111')
  })

  it('find => search by title', async () => {
    await global.Promise.all([bookService.save(book1), bookService.save(book2)])
    const result = await bookService.searchBook({ title: 'the gunslinger' }, { limit: 1 })

    should.equal(result.length, 1)
    const found = result[0]
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.title, 'The Gunslinger')
    should.equal(found.isbn, '111')
  })

  it('find => search by title partial', async () => {
    await global.Promise.all([bookService.save(book1), bookService.save(book2)])
    const result = await bookService.searchBook({ title: 'the guns' }, { limit: 1 })

    should.equal(result.length, 1)
    const found = result[0]
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.title, 'The Gunslinger')
    should.equal(found.isbn, '111')
  })

  it('find => search by isbn', async () => {
    await global.Promise.all([bookService.save(book1), bookService.save(book2)])
    const result = await bookService.searchBook({ isbn: '111' }, { limit: 1 })

    should.equal(result.length, 1)
    const found = result[0]
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.title, 'The Gunslinger')
    should.equal(found.isbn, '111')
  })

  it('find => should limit specified', async () => {
    await global.Promise.all([bookService.save(book1), bookService.save(book2)])
    const result = await bookService.searchBook({}, { limit: 1 })

    should.equal(result.length, 1)
    const found = result[0]
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.title, 'It')
    should.equal(found.isbn, '222')
  })

  it('find => should return both', async () => {
    await global.Promise.all([bookService.save(book1), bookService.save(book2)])
    const result = await bookService.searchBook({}, { limit: 2 })
    should.equal(result.length, 2)
  })

  it('find => should consider the offset', async () => {
    await global.Promise.all([bookService.save(book1), bookService.save(book2)])
    const result = await bookService.searchBook({}, { offset: 1 })

    should.equal(result.length, 1)
    const found = result[0]
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.title, 'The Gunslinger')
    should.equal(found.isbn, '111')
  })

  it('find => should return zero if wrong arguments', async () => {
    await bookService.save(book1)
    const result = await bookService.searchBook({ wrong: 'The Gunslinger' })
    should.equal(result.length, 0)
  })

  it('find => should ignore undefined arguments', async () => {
    await bookService.save(book1)
    const [found] = await bookService.searchBook({ title: 'The Gunslinger', isbn: undefined })
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.title, 'The Gunslinger')
    should.equal(found.isbn, '111')
  })

  it.only('find => should ignore undefined arguments', async () => {
    const a = await bookService.teste()
    console.log(a)
  })
})