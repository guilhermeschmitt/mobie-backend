import { describe, it, beforeEach } from 'mocha'
import should from 'should'
import VoteService from '@/services/VoteService'
import UserService from '@/services/UserService'
import BookService from '@/services/BookService'
import IntegrationTest from '../IntegrationTest'

describe('@/services/VoteService', function () {
  let userService
  let bookService
  let voteService
  let user
  let book1 = { title: 'The Gunslinger', release: new Date(), isbn: '111' }

  beforeEach((done) => {
    IntegrationTest(this, (db) => {
      userService = new UserService(db)
      bookService = new BookService(db)
      voteService = new VoteService(db)
      user = {
        username: 'dexter',
        email: 'dexter@gmail.com',
        socialId: 'AsjLKJnklsadfn'
      }
      done()
    })
  })

  it('vote => should vote a new book', async () => {
    const savedBook = await bookService.save(book1)
    const saved = await userService.save(user)
    await voteService.save(saved.id, savedBook.id, { rating: 5 })
    const votes = await voteService.list(saved.id)
    should.equal(votes.length, 1)
    should.equal(votes[0].rating, 5)
  })

  it('vote => should update a voting book', async () => {
    const savedBook = await bookService.save(book1)
    const saved = await userService.save(user)
    await voteService.save(saved.id, savedBook.id, { rating: 5 })
    await voteService.save(saved.id, savedBook.id, { rating: 3 })
    const votes = await voteService.list(saved.id)
    should.equal(votes.length, 1)
    should.equal(votes[0].rating, 3)
  })

  it('vote => should not allow rating bigger than 5', async () => {
    const savedBook = await bookService.save(book1)
    const saved = await userService.save(user)
    return voteService.save(saved.id, savedBook.id, { rating: 6 }).catch(err => {
      should.equal(err.name, 'SequelizeValidationError')
    })
  })

  it('vote => should not allow rating less than 0', async () => {
    const savedBook = await bookService.save(book1)
    const saved = await userService.save(user)
    return voteService.save(saved.id, savedBook.id, { rating: -1 }).catch(err => {
      should.equal(err.name, 'SequelizeValidationError')
    })
  })

  it('vote => should get user votes', async () => {
    const savedBook = await bookService.save(book1)
    const saved = await userService.save(user)
    await voteService.save(saved.id, savedBook.id, { rating: 5 })

    const votes = await voteService.list(saved.id)
    should.equal(votes.length, 1)
    should.equal(votes[0].book.id, savedBook.id)
  })

  it('vote => should find vote by user and book', async () => {
    const savedBook = await bookService.save(book1)
    const savedUser = await userService.save(user)
    const vote = await voteService.save(savedUser.id, savedBook.id, { rating: 5 })

    const savedVote = await voteService.find(savedUser.id, savedBook.id)
    should.equal(savedVote.userId, savedUser.id)
    should.equal(savedVote.userId, savedUser.id)
    should.equal(savedVote.rating, vote.rating)
  })

})