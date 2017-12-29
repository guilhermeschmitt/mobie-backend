import { describe, it, beforeEach } from 'mocha'
import should from 'should'
import IntegrationTest from './IntegrationTest'
import { Author } from '../src/entity/Author';

describe.only('DB Model', function () {
  let repo = undefined

  beforeEach(async () => {
    const conn = await IntegrationTest(this)
    repo = conn.getRepository(Author)
  })

  it.only('save => Author',  async () => {
    const author = new Author()
    author.name = 'author'
    
    const saved = await repo.save(author)
    const found = await repo.findOneById(saved.id)
    should.equal(found.id, saved.id)
  })
})