import initializeDb from '../src/db'
import ormconfig from '../ormconfig.json'

export default async (mocha) => {
  mocha.timeout(10000)
  return initializeDb(ormconfig[1])
}