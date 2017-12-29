import { Router } from 'express'
import jwt from 'jwt-simple'
import { UserService } from '../../../services/UserService'

export default ({ db }) => {
  let auth = Router()
  const service = new UserService(db)

  auth.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Access-Control-Expose-Headers", "Authorization, Location")
    next()
  })

  auth.get('/login', (req, res) => {
    const data = req.header('Authorization')
    const encoded = data.split(' ')[1]
    const decoded = Buffer.from(encoded, 'base64').toString().split(':')
    const login = decoded[0]
    const pass = decoded[1]
    if (login && pass) {
      service.authenticate(login, pass).then(user=> {
        if (user) {
          var payload = { id: user.id }
          var token = jwt.encode(payload, process.env.JWT_SECRET)
          res.header('Authorization', token)
          res.sendStatus(200)
        } else {
          res.sendStatus(401)
        }
      })
    } else {
      res.sendStatus(401)
    }
  })

  return auth
}