import { describe, it, beforeEach } from 'mocha'
import should from 'should'
import BookService from '@/services/BookService'
import IntegrationTest from '../IntegrationTest'

describe('BookService', function () {

  let db
  let service
  const nationality = { code: 'US', name: 'United States' }
  const author = { name: 'Stephen King', nationalityId: 'US' }
  const book1 = { title: 'The Gunslinger', release: new Date(), isbn: '111' }
  const book2 = { title: 'It', release: new Date(), isbn: '222' }

  beforeEach((done) => {
    IntegrationTest(this, (sequelize) => {
      db = sequelize
      service = new BookService(db)
      global.Promise.all([
        db.Nationality.create(nationality),
        db.Author.create(author),
      ]).then(() => done())
    })
  })

  it('save => book', async () => {
    const saved = await service.save(book1)
    saved.should.have.property('id').which.is.a.Number()
    should.equal(saved.title, 'The Gunslinger')
    should.equal(saved.isbn, '111')
  })

  it('find => by id', async () => {
    const saved = await service.save(book1)
    const found = await service.findById(saved.id)
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.title, 'The Gunslinger')
    should.equal(found.isbn, '111')
  })

  it('find => search by title', async () => {
    await global.Promise.all([service.save(book1), service.save(book2)])
    const result = await service.searchBook({ title: 'the gunslinger' }, { limit: 1 })

    should.equal(result.length, 1)
    const found = result[0]
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.title, 'The Gunslinger')
    should.equal(found.isbn, '111')
  })

  it('find => search by isbn', async () => {
    await global.Promise.all([service.save(book1), service.save(book2)])
    const result = await service.searchBook({ isbn: '111' }, { limit: 1 })

    should.equal(result.length, 1)
    const found = result[0]
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.title, 'The Gunslinger')
    should.equal(found.isbn, '111')
  })

  it('find => should limit specified', async () => {
    await global.Promise.all([service.save(book1), service.save(book2)])
    const result = await service.searchBook({ title: 'The Gunslinger' }, { limit: 1 })

    should.equal(result.length, 1)
    const found = result[0]
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.title, 'The Gunslinger')
    should.equal(found.isbn, '111')
  })

  it('find => should return both', async () => {
    await global.Promise.all([service.save(book1), service.save(book2)])
    const result = await service.searchBook({}, { limit: 2 })
    should.equal(result.length, 2)
  })

  it('find => should consider the offset', async () => {
    await global.Promise.all([service.save(book1), service.save(book2)])
    const result = await service.searchBook({}, { offset: 1 })

    should.equal(result.length, 1)
    const found = result[0]
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.title, 'The Gunslinger')
    should.equal(found.isbn, '111')
  })

  it('find => should return zero if wrong arguments', async () => {
    await service.save(book1)
    const result = await service.searchBook({ wrong: 'The Gunslinger' })
    should.equal(result.length, 0)
  })

  it('find => should ignore undefined arguments', async () => {
    await service.save(book1)
    const [found] = await service.searchBook({ title: 'The Gunslinger', isbn: undefined })
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.title, 'The Gunslinger')
    should.equal(found.isbn, '111')
  })

  it('find => should search case insensitive', async () => {
    await service.save(book1)
    const result = await service.searchBook({ title: 'the gunslinger' })
    should.equal(result.length, 1)
    const found = result[0]
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.title, 'The Gunslinger')
    should.equal(found.isbn, '111')
  })

  it('find => should search like', async () => {
    await service.save(book1)
    const result = await service.searchBook({ title: 'the gunsli' })
    should.equal(result.length, 1)
    const found = result[0]
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.title, 'The Gunslinger')
    should.equal(found.isbn, '111')
  })

  it('find => should return authors', async () => {
    const author = await db.Author.create(author)
    const authors = await db.Author.findAll({})
    should.equal(authors.length, 2)
    const saved = await service.save(book1)
    await saved.addAuthor(authors[0])

    const result = await service.searchBook({ title: 'the gunsli' }, { simple: false })

    should.equal(result.length, 1)
    const found = result[0]
    should.equal(found.authors.length, 1)
    should.equal(found.authors[0].name, 'Stephen King')
  })

})