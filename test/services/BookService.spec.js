import { describe, it, beforeEach, afterEach } from 'mocha'
import should from 'should'
import { createDb } from '../IntegrationTest'
import { BookService } from '../../src/services/BookService'

describe('BookService', function () {
  this.timeout(3000)
  let conn = undefined
  let bookService = undefined

  beforeEach(async () => {
    conn = await createDb(this)
    bookService = new BookService(conn)
  })

  afterEach(async () => {
    await conn.close()
  })

  it('find => by id', async () => {
    const found = await bookService.findById('xeIoDwAAQBAJ')
    should.equal(found.id, 'xeIoDwAAQBAJ')
    should.equal(found.title, 'The Dark Tower I (MTI)')
    should.equal(found.subtitle, 'The Gunslinger')
    should.equal(found.authors[0], 'Stephen King')
    should.equal(found.publishedDate, "2017-06-27")
    should.equal(found.pageCount, 384)
    should.equal(found.categories.length, 5)
    should.equal(found.industryIdentifiers[0].identifier, '1501166115') 
    should.equal(found.industryIdentifiers[1].identifier, '9781501166112') 
    should.equal(found.industryIdentifiers[1].identifier, '9781501166112') 
    should.equal(found.language, 'en') 
    found.should.have.property('imageLinks').which.is.a.Object()
    
  })

  it('find => search by title', async () => {
    const result = await bookService.searchBook('the gunslinger', { limit: 1 })
    result.should.have.property('totalItems').which.is.a.Number()

    const item = result.items[0]
    should.equal(item.id, 'xeIoDwAAQBAJ')
  })

  it('find => search by title partial', async () => {
    const result = await bookService.searchBook('the lord of the ring', { limit: 1 })
    result.should.have.property('totalItems').which.is.a.Number()
    
    const item = result.items[0]
    should.equal(item.id, 'yl4dILkcqm4C')
  })

  it('find => should limit specified', async () => {
    const result = await bookService.searchBook('the gunslinger', { limit: 1 })
    should.equal(result.items.length, 1)
  })

  it('find => should consider the offset', async () => {
    const result = await bookService.searchBook('the gunslinger', { offset: 1 })
    should.equal(result.items[0].id, 'wOkqDwAAQBAJ')
  })
})