import Service from '@/services/Service'

export default class extends Service {

  constructor(db) {
    super(db)
    this.User = this.db.User
    this.Vote = this.db.Vote

    this.responseModel = {
      include: [{
        model: this.db.Book,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }],
      attributes: {
        exclude: ['bookId']
      }
    }
  }

  async list(id) {
    const user = await this.User.findById(id)
    const votes = await user.getVotes({...this.responseModel})
    return votes.map(vote => vote.get())
  }

  async find(userId, bookId) {
    return this.Vote.findOne({ where: { userId, bookId }, ...this.responseModel })
      .then(vote => {
        return vote ? vote.get() : null
      })
  }

  async save(userId, bookId, vote) {
    const saved = await this.Vote.findOrCreate({ where: { userId, bookId } })
    return saved[0].update(vote)
  }
}