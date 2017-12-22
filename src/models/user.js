import Sequelize from 'sequelize'

export default (sequelize) => {
  const User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    username: { 
      type: Sequelize.STRING, 
      unique: true,
      validate: {
        len: [0, 100]
      }  
    },
    password: { 
      type: Sequelize.STRING, 
      validate: {
        len: [0, 100]
      }  
    },
    email: { 
      type: Sequelize.STRING, 
      unique: true,
      validate: {
        isEmail: true,
        len: [0, 100]
      } 
    },
    socialId: Sequelize.STRING
  })
  return User
}