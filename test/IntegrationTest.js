import initializeDb from '../src/db'

export default (mocha, callback) => {
  mocha.timeout(10000)
  const settings = {
    connection: process.env.DB_CONNECTION_TEST,
  }
  initializeDb(settings, (sequelize) => callback(sequelize))
}