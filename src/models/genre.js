import Sequelize from 'sequelize'

export default sequelize => {
  return sequelize.define('genre', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING },
  }, { timestamps: false })
}