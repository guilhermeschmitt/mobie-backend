import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import config from '@/config.json'
import initializeDb from '@/db'
import auth from '@/api/rest/v1/auth'
import apiv1 from '@/api/rest/v1'
import graphql from '@/api/graphql/v1'

/* Server config */
let app = express()
app.use(morgan('dev'))
app.use(cors({ exposedHeaders: config.corsHeaders }))
app.use(bodyParser.json({ limit: config.bodyLimit }))

initializeDb({ connection: process.env.DB_CONNECTION }, (db) => {

  app.get((req, res) => res.sendStatus(200))
  console.log('teste')

  // auth
  app.use('/auth', auth({ config, db }))

  // api
  app.use('/api/rest/v1', apiv1({ config, db }))
  app.use('/api/graphql/v1', graphql({ config, db }))

  app.listen(process.env.PORT, () => {})
})
