const chalk = require('chalk')
const mysql = require('mysql')

module.exports = {
  clear: ({ host, schema, user, password }, callback) => {
    const con = mysql.createConnection({ host, user, password })
    con.connect(err => {
      if(err) throw err
      const dropSchema = `DROP SCHEMA IF EXISTS ${schema}`
      const createSchema = `CREATE SCHEMA ${schema}`

      console.log(chalk.red('DROPPING SCHEMA'), chalk.underline.magenta(`${schema}`))
      con.query(dropSchema, (err) => {
        if (err) throw err
        con.query(createSchema, err => {
          if (err) throw err
          console.log(chalk.blue('CREATING SCHEMA'), chalk.underline.magenta(`${schema}`))
          callback()
        })
      })
    })
  }
}