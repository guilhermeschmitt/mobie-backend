import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import initializeDb from './db'
import apiv1 from './api'
import auth from './api/auth'

export const start = (args) => {

  /* Server config */
  let app = express()
  app.use(morgan('dev'))
  app.use(cors({ exposedHeaders: ["Link"] }))
  app.use(bodyParser.json({ limit: "100kb" }))

  // ping
  app.get('/', (req, res) => {
    res.sendStatus(200)
  })

  return initializeDb(args).then((db) => {
    app.use('/auth', auth({ db }))
    app.use('/api/v1', apiv1({ db }))
    app.listen(process.env.PORT || 8081, () => { })
    return { server: app, db }
  })
}

start()

