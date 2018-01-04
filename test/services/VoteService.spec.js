import { describe, it, beforeEach, afterEach } from 'mocha'
import should from 'should'
import { createDb } from '../IntegrationTest'
import { VoteService } from '../../src/services/VoteService'
import { User } from '../../src/models'

describe('VoteService', function () {
  let conn = undefined
  let voteService = undefined

  beforeEach(async () => {
    conn = await createDb(this)
    voteService = new VoteService(conn)
  })

  afterEach(async () => {
    await conn.close()
  })

  it('vote => should save', async () => {
    const user = { username: 'urameshi', password: 'pass', email: 'urameshi@urameshi.com' }
    const savedUser = await conn.getRepository(User).save(user)

    const vote = { rating: 5 }
    const savedVote = await voteService.save(savedUser.id, 'xeIoDwAAQBAJ', vote)

    should.equal(savedVote.bookId, 'xeIoDwAAQBAJ')
    should.equal(savedVote.userId, savedUser.id)
  })

  it('vote => should find', async () => {
    const user = { username: 'urameshi', password: 'pass', email: 'urameshi@urameshi.com' }
    const savedUser = await conn.getRepository(User).save(user)
    const vote = { rating: 5 }
    await voteService.save(savedUser.id, 'xeIoDwAAQBAJ', vote)
    const foundVote = await voteService.find(savedUser.id, 'xeIoDwAAQBAJ')
    should.equal(foundVote.bookId, 'xeIoDwAAQBAJ')
    should.equal(foundVote.userId, savedUser.id)
    should.equal(foundVote.book.title, 'The Dark Tower I (MTI)')
  })

  it('vote => should list', async () => {
    const user = { username: 'urameshi', password: 'pass', email: 'urameshi@urameshi.com' }
    const savedUser = await conn.getRepository(User).save(user)

    await voteService.save(savedUser.id, 'xeIoDwAAQBAJ', { rating: 5 })
    await voteService.save(savedUser.id, 'xeIoDwAAQBAP', { rating: 3 })
    await voteService.save(savedUser.id, 'xeIoDwAAQBAQ', { rating: 3 })

    const votes = await voteService.list(savedUser.id)
    should.equal(votes[0].bookId, 'xeIoDwAAQBAJ')
    should.equal(votes[1].bookId, 'xeIoDwAAQBAP')
    should.equal(votes[2].bookId, 'xeIoDwAAQBAQ')
  })
})