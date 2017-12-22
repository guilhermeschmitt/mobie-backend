import Sequelize from 'sequelize'

export default (sequelize) => {
  const Author = sequelize.define('author', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING
  })

  return Author
}