import Sequelize from 'sequelize'

export default sequelize => {
  return sequelize.define('vote', {
    rating: {
      type: Sequelize.INTEGER,
      validate: { max: 5, min: 0 }
    },
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true      
    },
    bookId: {
      type: Sequelize.INTEGER,
      primaryKey: true      
    }
  })
}