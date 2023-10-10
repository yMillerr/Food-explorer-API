const knex = require('knex')
const knexConfig = require('../../../knexfile')

const databaseConnection = knex(knexConfig.development)

module.exports = databaseConnection
