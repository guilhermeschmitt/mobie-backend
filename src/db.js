import Sequelize from 'sequelize'
import schemaModel from '@/models'

export default ({ schema, username, password, clear = false }, callback) => {
  const Op = Sequelize.Op

  const sequelize = new Sequelize(schema, username, password, {
    dialect: 'mysql',
    omitNull: true,
    operatorsAliases: { $and: Op.and, $like: Op.like },
    logging: false,
    typeValidation: true
  })

  schemaModel(sequelize)
  sequelize.sync({ 
    force: clear 
  }).then(() => callback(sequelize))
}

