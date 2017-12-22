import Sequelize from 'sequelize'

export default sequelize => {
  return sequelize.define('vote', {
    rating: {
      type: Sequelize.INTEGER,
      validate: { max: 5, min: 0 }
    }
  })
}