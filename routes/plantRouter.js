const db = require('../data/dbConfig')
const router = require('express').Router()
const crudMethodMaker = require('../utils/crudMethodMaker')

const methods = crudMethodMaker(db, 'plants')
require('../utils/crudRouteMaker')(router, methods)

router.get('/:id/notifications', getPlantNotifications)

module.exports = router

function getPlantNotifications (req, res, next) {
  const { id } = req.params
  db('notifications')
    .where({ plantId: id })
    .then(notifications => res.status(200).json(notifications))
    .catch(err => res.status(500).json(err))
}
