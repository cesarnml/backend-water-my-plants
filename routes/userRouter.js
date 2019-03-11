const db = require('../data/dbConfig')
const router = require('express').Router()
const crudMethodMaker = require('../utils/crudMethodMaker')

const methods = crudMethodMaker(db, 'users')
require('../utils/crudRouteMaker')(router, methods)

module.exports = router
