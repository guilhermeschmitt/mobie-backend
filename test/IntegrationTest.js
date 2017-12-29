import initializeDb from '../src/db'
import ormconfig from '../ormconfig.json'

export const createDb = async () => {
  var fs = require('fs')
  var filePath = `${process.cwd()}/mobie.db`
  if (fs.existsSync(filePath))
    fs.unlinkSync(filePath)

  return initializeDb(ormconfig[1])
}