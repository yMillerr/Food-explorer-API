const { Router } = require('express')

const usersRoutes = Router()

const UsersController = require('../controllers/UsersControllers')

const usersControllers = new UsersController()
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

usersRoutes.post('/', usersControllers.create)
usersRoutes.put('/:id', ensureAuthenticated, usersControllers.update)

module.exports = usersRoutes
