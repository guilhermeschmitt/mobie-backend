require('../config/env')
const db = require('../config/db')

process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// Run mocha tests
const Mocha = require('mocha')
const mocha = new Mocha({
  ignoreLeaks: true,
  recursive: true
})

const getTestFiles = (dir, filelist = []) => {
  let fs = require('fs')
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const path = `${dir}/${file}`
    filelist = fs.statSync(path).isDirectory() ? getTestFiles(path, filelist) : [...filelist, path]
  })
  return filelist
}

getTestFiles('./test').forEach(path => mocha.addFile(path))

/** Database **/
db.clear({
  host: 'localhost',
  user: process.env.DB_USER_TEST,
  password: process.env.DB_PASS_TEST,
  schema: process.env.DB_SCHEMA_TEST
}, () => {
  mocha.run((failures) => {
    process.on('exit', () => process.exit(failures))
    process.exit()
  })
})

