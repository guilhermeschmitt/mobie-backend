import { Router } from 'express'
import UserService from '@/services/UserService'

export default ({ db }) => {
  let users = Router()
  const userService = new UserService(db)

  users.get('/:userId', (req, res) => {
    userService.findById(req.params.userId).then(user => res.json(user))
  })

  users.get('/:userId/votes/', (req, res) => {
    userService.getVotes(req.params.userId).then(books => res.json(books))
  })

  users.get('/:userId/votes/:bookId', (req, res) => {
    userService.findVote(req.params.userId, req.params.bookId).then(vote => {
      vote ? res.json(vote) : res.sendStatus(404)
    })
  })

  users.post('/:userId/votes/:bookId', (req, res) => {
    userService.addVote(req.params.userId, req.params.bookId, req.body).then(vote => {
      res.json(vote)
    })
  })

  users.put('/:userId/votes/:bookId', (req, res) => {
    userService.addVote(req.params.userId, req.params.bookId, { rating: 5 }).then(() => {
      res.sendStatus(200)
    })
  })

  return users
}