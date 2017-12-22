import { describe, it, beforeEach } from 'mocha'
import should from 'should'
import UserService from '@/services/UserService'
import BookService from '@/services/BookService'
import IntegrationTest from '../IntegrationTest'

describe('UserService', function () {
  let service
  let bookService
  let user
  let book1 = { title: 'The Gunslinger', release: new Date(), isbn: '111' }

  beforeEach((done) => {
    IntegrationTest(this, (db) => {
      service = new UserService(db)
      bookService = new BookService(db)
      user = {
        username: 'dexter',
        email: 'dexter@gmail.com',
        socialId: 'AsjLKJnklsadfn'
      }
      done()
    })
  })

  it('save => User', async () => {
    const saved = await service.save(user)
    saved.should.have.property('id').which.is.a.Number()
    should.equal(saved.username, 'dexter')
    should.equal(saved.email, 'dexter@gmail.com')
    should.equal(saved.socialId, 'AsjLKJnklsadfn')
  })

  it('save => should not allow wrong email', async () => {
    user.email = 'testom'
    service.save(user).catch(error => {
      should.equal(error.name, 'SequelizeValidationError')
    })
  })

  it('save => should not allow same email', async () => {
    service.save(user).then(() => {
      service.save(user).catch(error => {
        should.equal(error.name, 'SequelizeUniqueConstraintError')
      })
    })
  })

  it('find => should find user by id', async () => {
    const saved = await service.save(user)
    const found = await service.findById(saved.id)
    found.should.have.property('id').which.is.a.Number()
    should.equal(found.username, 'dexter')
    should.equal(found.email, 'dexter@gmail.com')
    should.equal(found.socialId, 'AsjLKJnklsadfn')
  })

  it('vote => should vote a new book', async () => {
    const bookSaved = await bookService.save(book1)
    const saved = await service.save(user)
    await service.addVote(saved.id, bookSaved.id, { rating: 5 })
    const books = await service.getVotes(saved.id)
    should.equal(books.length, 1)
    should.equal(books[0].rating, 5)
  })

  it('vote => should update a voting book', async () => {
    const bookSaved = await bookService.save(book1)
    const saved = await service.save(user)
    await service.addVote(saved.id, bookSaved.id, { rating: 5 })
    await service.addVote(saved.id, bookSaved.id, { rating: 3 })
    const books = await service.getVotes(saved.id)
    should.equal(books.length, 1)
    should.equal(books[0].rating, 3)
  })

  it('vote => should not allow rating bigger than 5', async () => {
    const bookSaved = await bookService.save(book1)
    const saved = await service.save(user)
    return service.addVote(saved.id, bookSaved.id, { rating: 6 }).catch(err => {
      should.equal(err.name, 'SequelizeValidationError')
    })
  })

  it('vote => should not allow rating less than 0', async () => {
    const bookSaved = await bookService.save(book1)
    const saved = await service.save(user)
    return service.addVote(saved.id, bookSaved.id, { rating: -1 }).catch(err => {
      should.equal(err.name, 'SequelizeValidationError')
    })
  })

  it('vote => should get user books', async () => {
    const bookSaved = await bookService.save(book1)
    const saved = await service.save(user)
    await service.addVote(saved.id, bookSaved.id, { rating: 5 })

    const votes = await service.getVotes(saved.id)
    should.equal(votes.length, 1)
    should.equal(votes[0].id, bookSaved.id)
  })

  it('vote => should get user vote by id', async () => {
    const bookSaved = await bookService.save(book1)
    const saved = await service.save(user)
    const vote = await service.addVote(saved.id, bookSaved.id, { rating: 5 })

    const savedVote = await service.findVote(saved.id, bookSaved.id)
    should.equal(savedVote.id, vote.id)
    should.equal(savedVote.rating, vote.rating)
  })
})