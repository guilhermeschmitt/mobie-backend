import Sequelize from 'sequelize'
import schemaModel from '@/models'

export default ({ connection = 'sqlite://:memory' }, callback) => {
  const Op = Sequelize.Op
  const sequelize = new Sequelize(connection, {
    // dialect,
    omitNull: true,
    operatorsAliases: { $and: Op.and, $like: Op.like },
    logging: false,
    typeValidation: true
  })

  schemaModel(sequelize)
  sequelize.sync().then(() => callback(sequelize))
}

