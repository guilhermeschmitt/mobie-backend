import { describe, it, beforeEach } from 'mocha'
import should from 'should'
import IntegrationTest from './IntegrationTest';
// import { try } from '../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bluebird';

const nationality = { code: 'US', name: 'United States' }
const author = { name: 'TESTE', nationalityId: '' }
const user = {
  username: 'dexter',
  email: 'dexter@gmail.com',
  socialId: 'AsjLKJnklsadfn'
}

const book = {
  title: 'The Gunslinger',
  release: new Date(),
  isbn: '079876540123'
}

const book2 = {
  title: 'It',
  release: new Date(),
  isbn: '222'
}

describe('DB Model', function () {
  let db
  beforeEach((done) => {
    IntegrationTest(this, (sequelize) => {
      db = sequelize
      db.Nationality.create(nationality).then(() => done())
    })
  })

  it('save => Author', done => {
    author.nationalityId = nationality.code
    db.Author.create(author).then(saved => {
      saved.should.have.property('id').which.is.a.Number()
      should.equal(saved.name, 'TESTE')
      should.equal(saved.nationalityId, 'US')
      done()
    })
  })

  it('save => User', done => {
    db.User.create(user).then(saved => {
      saved.should.have.property('id').which.is.a.Number()
      should.equal(saved.username, 'dexter')
      should.equal(saved.email, 'dexter@gmail.com')
      done()
    })
  })

  it('save => Book', done => {
    db.Book.create(book).then(saved => {
      saved.should.have.property('id').which.is.a.Number()
      should.equal(saved.title, 'The Gunslinger')
      should.equal(saved.isbn, '079876540123')
      done()
    })
  })

  it('save => AuthorBook', done => {
    const saveBook = db.Book.create(book)
    const saveAuthor = db.Author.create(author)

    global.Promise.all([saveBook, saveAuthor]).then(([savedBook, savedAuthor]) => {
      savedBook.addAuthor(savedAuthor).then(() => {
        db.Book.find({ where: { id: savedBook.id }, include: [{ model: db.Author }] }).then(() => {
          done()
        })
      })
    })
  })

  it('save => should not allow duplicate vote', async () => {
    const savedUser = await db.User.create(user)
    const savedBook1 = await db.Book.create(book)
    const savedBook2 = await db.Book.create(book2)
    await db.Vote.create({ rating: 5, userId: savedUser.id, bookId: savedBook1.id })
    await db.Vote.create({ rating: 4, userId: savedUser.id, bookId: savedBook2.id })
    try {
      await db.Vote.create({ rating: 3, userId: savedUser.id, bookId: savedBook1.id })
    } catch(e) {
      should.equal(e.name, 'SequelizeUniqueConstraintError')
    }
  })

})