import Service from '@/services/Service'

export default class extends Service {
  constructor(db) {
    super(db)
    this.Author = this.db.Author
  }

  save(author) {
    return this.Author.create(author)
  }

  findById(id = -1) {
    return this.Author.findById(id)
  }

  findByName(name = '') {
    return this.Author.findOne({ where: { name } })
  }
}