// Compile with babel
require('babel-core/register')
require("babel-polyfill")

const fs = require('fs')

// ENV
const dotenv = require('dotenv')
dotenv.config()
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
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const path = `${dir}/${file}`
    filelist = fs.statSync(path).isDirectory() ? getTestFiles(path, filelist) : [...filelist, path]
  })
  return filelist
}

const argv = process.argv.slice(2)
if (argv.length > 0) 
  argv.forEach(path => mocha.addFile(path))
else 
  getTestFiles('./test').forEach(path => mocha.addFile(path))

/** Database **/
const mysql = require('mysql')
const con = mysql.createConnection({ host: "localhost", user: process.env.DB_USER_TEST, password: process.env.DB_PASS_TEST })
con.connect(() => {
  const sql = `DROP SCHEMA IF EXISTS ${process.env.DB_SCHEMA_TEST}`
  con.query(sql, () => {
    con.query(`CREATE SCHEMA ${process.env.DB_SCHEMA_TEST}`, () => {
      mocha.run((failures) => {
        process.on('exit', () => process.exit(failures))
        process.exit()
      })
    })
  })
})

