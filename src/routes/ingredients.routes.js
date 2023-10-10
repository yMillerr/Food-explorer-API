const { Router } = require('express')

const IngredientsController = require('../controllers/IngredientsController')

const ingredientsController = new IngredientsController()

const ingredientsRoutes = Router()

const ensureAuthenticated = require('../middleware/ensureAuthenticated')
const adminVerification = require('../middleware/adminVerification')


ingredientsRoutes.use(ensureAuthenticated, adminVerification)
ingredientsRoutes.delete('/:id', ingredientsController.delete)
ingredientsRoutes.get('/:product_id', ingredientsController.index)

module.exports = ingredientsRoutes
