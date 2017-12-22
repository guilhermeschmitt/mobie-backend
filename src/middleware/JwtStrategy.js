import passportJWT from 'passport-jwt'
import UserService from '@/services/UserService'

const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy

const params = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

export default ({ db }) => {
  const userService = new UserService(db)
  return new Strategy(params, (payload, done) => {
    userService.findById(payload.id).then(user => {
      return (user) ? done(null, { id: user.id }) : done(new Error("User not found"), null)
    })
  })
}