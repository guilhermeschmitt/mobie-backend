import Sequelize from'sequelize'

export default sequelize => {
  return sequelize.define('nationality', {
    code: { type: Sequelize.STRING, primaryKey: true, len: 2 },
    name: { type: Sequelize.STRING },
  }, { timestamps: false })
}