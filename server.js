const express = require('express')
const helmet = require('helmet')
const logger = require('morgan')
const cors = require('cors')

const server = express()

server.use(cors())
server.use(helmet())
server.use(logger('dev'))
server.use(express.json())

require('./routes')(server)

module.exports = server
