import { describe, it, beforeEach } from 'mocha'
import should from 'should'
import UserService from '@/services/UserService'
import IntegrationTest from '../IntegrationTest'

describe('UserService', function () {
  let service
  let user

  beforeEach((done) => {
    IntegrationTest(this, (db) => {
      service = new UserService(db)
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
})