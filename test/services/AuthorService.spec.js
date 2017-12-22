import { describe, it, beforeEach } from 'mocha'
import should from 'should'
import IntegrationTest from '../IntegrationTest'
import AuthorService from '@/services/AuthorService'

describe('Author Service', function () {
  let db
  const nationality = { code: 'US', name: 'United States' }

  beforeEach((done) => {
    IntegrationTest(this, (sequelize) => {
      db = sequelize
      db.Nationality.create(nationality).then(() => done())
    })
  })

  it('save => Author', (done) => {
    const service = new AuthorService(db)
    const author = { name: 'TESTE', nationalityId: nationality.code }
    service.save(author).then(saved => {
      saved.should.have.property('id').which.is.a.Number()
      should.equal(saved.name, 'TESTE')
      should.equal(saved.nationalityId, 'US')
      done()
    })
  })

  it('find => By ID', done => {
    const service = new AuthorService(db)
    const author = { name: 'TESTE', nationalityId: nationality.code }
    service.save(author).then(saved => {
      service.findById(saved.id).then(found => {
        found.should.have.property('id').which.is.a.Number()
        should.equal(found.name, 'TESTE')
        should.equal(found.nationalityId, 'US')
        done()
      })
    })
  })

  it('find => By Name', done => {
    const service = new AuthorService(db)
    const author = { name: 'TESTE', nationalityId: nationality.code }
    service.save(author).then(() => {
      service.findByName('TESTE').then(found => {
        found.should.have.property('id').which.is.a.Number()
        should.equal(found.name, 'TESTE')
        should.equal(found.nationalityId, 'US')
        done()
      })
    })
  })

  it('find => By Name should return null', done => {
    const service = new AuthorService(db)
    service.findByName().then(found => {
      should.equal(found, null)
      done()
    })
  })
})