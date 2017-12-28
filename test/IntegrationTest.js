import initializeDb from '../src/db'

export default (mocha, callback) => {
  mocha.timeout(10000)
  initializeDb({}, (sequelize) => callback(sequelize))
}