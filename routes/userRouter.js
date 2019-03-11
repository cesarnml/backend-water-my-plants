const db = require('../data/dbConfig')
const router = require('express').Router()
const crudMethodMaker = require('../utils/crudMethodMaker')

const methods = crudMethodMaker(db, 'users')

require('../utils/crudRouteMaker')(router, methods)

router.get('/:id/notifications', getUserNotifications)
router.get('/:id/plants', getUserPlants)

router.delete('/:id/notifications', deleteUserNotifications)

module.exports = router

function getUserNotifications (req, res, next) {
  const { id } = req.params
  db('notifications')
    .where({ userId: id })
    .then(notifications => {
      res.status(200).json(notifications)
    })
    .catch(err => res.status(500).json(err))
}

function getUserPlants (req, res, next) {
  const { id } = req.params
  db('plants')
    .where({ userId: id })
    .then(plants => {
      res.status(200).json(plants)
    })
    .catch(err => res.status(500).json(err))
}

function deleteUserNotifications (req, res, next) {
  const { id } = req.params
  db('notifications')
    .where({ userId: id })
    .delete()
    .then(count => {
      res.status(200).json(count)
    })
    .catch(err => res.status(500).json(err))
}