require('dotenv').config()
const db = require('../data/dbConfig')
const bcrypt = require('bcryptjs')
const router = require('express').Router()

const generateToken = require('../utils/generateToken')
const checkCredentials = require('../middleware/checkCredentials')

router.post('/register', checkCredentials, register)

router.post('/login', checkCredentials, login)

module.exports = router

//* Route Handlers
function register (req, res, next) {
  const { username, password, firstName, lastName, phoneNumber } = req.body
  const user = {
    username,
    password,
    firstName,
    lastName,
    phoneNumber
  }
  user.password = bcrypt.hashSync(password, Number(process.env.HASH_ROUNDS))
  db('users')
    .insert(user)
    .returning('*')
    .then(inserted => {
      const user = inserted[0]
      delete user.password
      const token = generateToken(user)
      res.status(201).json({ user, token })
    })
    .catch(err => res.status(500).json(err))
}

function login (req, res, next) {
  const { username, password } = req.body
  db('users')
    .where({ username })
    .first()
    .then(user => {
      const isValid = bcrypt.compareSync(password, user.password)
      if (!user || !isValid) {
        res.status(401).json({ error: 'invalid username or password' })
      } else {
        delete user.password
        const token = generateToken(user)
        res.status(200).json({ user, token })
      }
    })
    .catch(err => res.status(500).json(err))
}
