import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import config from './config.json'
import createDb from './db'

/* Server config */
let app = express()
app.use(morgan('dev'))
app.use(cors({ exposedHeaders: config.corsHeaders }))
app.use(bodyParser.json({ limit: config.bodyLimit }))

createDb((db) => {
  // ping
  app.get('/', (req, res) => {})

  app.listen(process.env.PORT, () => { })
})