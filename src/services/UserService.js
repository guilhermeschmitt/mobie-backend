import Service from './Service'
import { User } from '../models'

export class UserService extends Service {
  constructor(db) {
    super(db)
    this.userRepo = this.db.getRepository(User)
  }

  async save(user) {
    return this.userRepo.save(user)
  }

  async findById(id) {
    return this.userRepo.findOneById(id)
  }

  async authenticate(username, password) {
    return this.userRepo.findOne({ username, password })
  }
}