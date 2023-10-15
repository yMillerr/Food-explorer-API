const { Router } = require('express')

const usersRoutes = Router()

const UsersController = require('../controllers/UsersControllers')
const usersControllers = new UsersController()

usersRoutes.post('/', usersControllers.create)

module.exports = usersRoutes
