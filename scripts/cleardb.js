require('../config/env')
const db = require('../config/db')

db.clear({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  schema: process.env.DB_SCHEMA
}, () => {
  process.exit()
})
