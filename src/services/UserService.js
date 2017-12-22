import Service from '@/services/Service'

export default class extends Service {
  constructor(db) {
    super(db)
    this.User = this.db.User
    this.Vote = this.db.Vote
  }

  async save(User) {
    return this.User.create(User).then(user => user.get())
  }

  async findById(id) {
    return this.User.findById(id).then(user => user.get())
  }

  async getVotes(id) {
    const user = await this.User.findById(id)
    const votes = await user.getVotes({
      include:  [{ model: this.db.Book }]
    })
    return votes.map(vote => vote.get())
  }

  async findVote(userId, bookId) {
    return this.Vote.findOne({ where: { userId, bookId } }).then(vote => vote.get())
  }

  async addVote(userId, bookId, vote) {
    const saved = await this.Vote.findOrCreate({ where: { userId, bookId } })
    return saved[0].update(vote)
  }

  async authenticate(username, password) {
    return this.User.findOne({ where: { username, password } })
  }
}