import initializeDb from '../src/db'

export default (mocha, callback) => {
  mocha.timeout(10000)
  const settings = {
    schema: process.env.DB_SCHEMA_TEST,
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASS_TEST,
    clear: true
  }
  initializeDb(settings, (sequelize) => callback(sequelize))
}