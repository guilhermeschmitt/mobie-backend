import { Router } from 'express'
import passport from 'passport'
import JwtStrategy from './JwtStrategy'

export default ({ config, db }) => {
	let routes = Router()

	// JWT Strategy
	const jwtStrategy = JwtStrategy({ config, db })
	passport.use(jwtStrategy)
	routes.use(passport.initialize())
	routes.use(passport.authenticate("jwt", { 
		session: false,
	}))

	return routes
}