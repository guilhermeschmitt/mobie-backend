import author from '@/models/author'
import nationality from '@/models/nationality'
import book from '@/models/book'
import user from '@/models/user'
import genre from '@/models/genre'
import vote from '@/models/vote'

export default (sequelize) => {
  /** TABLES **/
  sequelize.Author = author(sequelize)
  sequelize.Genre = genre(sequelize)
  sequelize.Nationality = nationality(sequelize)
  sequelize.User = user(sequelize)
  sequelize.Book = book(sequelize)
  sequelize.Vote = vote(sequelize)

  /** RELATIONSHIPS **/
  sequelize.Author.belongsTo(sequelize.Nationality, { foreignKey: { name: 'nationalityId', constraint: true }, targetKey: 'code' })
  sequelize.Book.belongsTo(sequelize.Genre, { foreignKey: { name: 'genreId', constraint: true }, targetKey: 'id' })

  sequelize.Vote.belongsTo(sequelize.Book, { foreignKey: { constraint: true }, targetKey: 'id' })
  sequelize.Vote.belongsTo(sequelize.User, { foreignKey: { constraint: true }, targetKey: 'id' })
  sequelize.User.hasMany(sequelize.Vote)

  const AuthorBook = sequelize.define('AuthorBook')
  sequelize.Book.belongsToMany(sequelize.Author, { through: AuthorBook })
  sequelize.Author.belongsToMany(sequelize.Book, { through: AuthorBook })
}