import { describe, it, beforeEach, afterEach } from 'mocha'
import should from 'should'
import { createDb } from '../IntegrationTest'
import { UserService } from '../../src/services/UserService'

describe('UserService', function () {
  let conn = undefined
  let userService = undefined
  const user = { username: 'urameshi', password: 'pass', email: 'urameshi@urameshi.com' }

  beforeEach(async () => {
    conn = await createDb(this)
    userService = new UserService(conn)
  })

  afterEach(async () => {
    await conn.close()
  })

  it('user => should save', async () => {
    const savedUser = await userService.save(user)
    should.exists(savedUser.id)
  })

  it('user => should find', async () => {
    const savedUser = await userService.save(user)
    const foundUser = await userService.findById(savedUser.id)
    should.equal(foundUser.name, savedUser.name)
  })

  it('user => should authenticate success', async () => {
    const savedUser = await userService.save(user)
    const foundUser = await userService.authenticate(user.username, user.password)
    should.equal(foundUser.name, savedUser.name)
  })

  it('user => should authenticate fail', async () => {
    await userService.save(user)

    const foundUser1 = await userService.authenticate(user.username, "wrong")
    const foundUser2 = await userService.authenticate("wrong", user.password)
    should.equal(foundUser1, null)
    should.equal(foundUser2, null)
  })
})