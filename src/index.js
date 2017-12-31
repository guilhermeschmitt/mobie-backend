import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import config from './config.json'
import initializeDb from './db'
import apiv1 from './api'
import auth from './api/auth'

export const start = (args) => {
  
  /* Server config */
  let app = express()
  app.use(morgan('dev'))
  app.use(cors({ exposedHeaders: config.corsHeaders }))
  app.use(bodyParser.json({ limit: config.bodyLimit }))

  // ping
  app.get('/', (req, res) => {
    res.sendStatus(200)
  })

  return initializeDb(args).then((db) => {
    app.use('/auth', auth({ config, db }))
    app.use('/api/rest/v1', apiv1({ config, db }))

    app.listen(process.env.PORT || 8081, () => { })

    return { server: app, db }
  })
}

start()

