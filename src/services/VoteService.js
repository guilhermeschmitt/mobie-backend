import Service from './Service'
import { Vote } from '../models'
import { BookService } from './BookService'

export class VoteService extends Service {

  constructor(db) {
    super(db)
    this.voteRepo = this.db.getRepository(Vote)
    this.bookService = new BookService(db)
  }

  async list(userId) {
    return this.voteRepo.find({ userId })
  }

  async find(userId, bookId) {
    const vote = await this.voteRepo.findOne({ userId, bookId })
    vote.book = await this.bookService.findById(vote.bookId)
    return vote
  }

  async save(userId, bookId, vote) {
    vote.userId = userId
    vote.bookId = bookId
    return this.voteRepo.save(vote)
  }
}