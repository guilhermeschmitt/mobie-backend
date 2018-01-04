import { describe, it, beforeEach, afterEach } from 'mocha'
import should from 'should'
import { createDb } from './IntegrationTest'
import { User, Vote } from '../src/models/'

describe('DB Model', function () {
  let conn = undefined

  beforeEach(async () => {
    conn = await createDb(this)
  })

  afterEach(async () => {
    await conn.close()
  })

  it('user => attrs, relationships', async () => {
    const user = { username: 'urameshi', password: 'pass', email: 'urameshi@urameshi.com' }
    const savedUser = await conn.getRepository(User).save(user)

    const vote = { rating: 5, user: savedUser, bookId: 'xeIoDwAAQBAJ' }
    await conn.getRepository(Vote).save(vote)
    const foundVote = await conn.getRepository(Vote).findOneById({bookId: 'xeIoDwAAQBAJ', userId: savedUser.id}, { relations: ["user"] })
    should.equal(foundVote.userId, savedUser.id)
    should.equal(foundVote.rating, vote.rating)
    should.equal(foundVote.user.username, savedUser.username)
  })
})