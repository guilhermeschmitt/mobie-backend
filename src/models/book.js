import Sequelize from 'sequelize'

export default (sequelize) => {
  const Book = sequelize.define('book', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: Sequelize.STRING,
    release: Sequelize.TIME,
    isbn: Sequelize.STRING
  })

  return Book
}