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
    return this.User.findById(id).then(user => {
      return user ? user.get() : null
    })
  }

  async authenticate(username, password) {
    return this.User.findOne({ where: { username, password } })
  }
}