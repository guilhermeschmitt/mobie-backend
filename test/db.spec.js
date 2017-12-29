import { describe, it, beforeEach, afterEach } from 'mocha'
import should from 'should'
import { createDb } from './IntegrationTest'
import { Author, Book, Genre, User, Vote } from '../src/models/'

describe('DB Model', function () {
  let conn = undefined

  beforeEach(async () => {
    conn = await createDb(this)
  })

  afterEach(async () => {
    await conn.close()
  })

  it('book => attrs, relationships', async () => {
    const genre = { name: 'Horror' }
    const author = { name: 'Author' }
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
    should.equal(foundBook.genre.name, genre.name)
    should.equal(foundBook.authors[0].name, author.name)
  })

  it('user => attrs, relationships', async () => {
    const user = { username: 'urameshi', password: 'pass', email: 'urameshi@urameshi.com' }
    const book = new Book()
    book.title = "It"
    book.isbn = "111"
    book.releaseDate = new Date()

    const savedUser = await conn.getRepository(User).save(user)
    const savedBook = await conn.getRepository(Book).save(book)

    const vote = { rating: 5, user: savedUser, book: savedBook }
    const savedVote = await conn.getRepository(Vote).save(vote)
    const foundVote = await conn.getRepository(Vote).findOneById(savedVote.id, { relations: ["book", "user"] })
    should.equal(foundVote.userId, savedUser.id)
    should.equal(foundVote.rating, vote.rating)
    should.equal(foundVote.user.username, savedUser.username)
    should.deepEqual(foundVote.book, savedBook)
  })
})