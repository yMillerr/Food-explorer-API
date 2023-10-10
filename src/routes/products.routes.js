const { Router } = require('express')

const adminVerification = require('../middleware/adminVerification')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const multer = require("multer")
const uploadConfig = require("../configs/upload")

const ProductsController = require('../controllers/ProductsController')
const ProductsPictureController = require("../controllers/ProductsPictureController")

const productsController = new ProductsController()
const productsPictureController = new ProductsPictureController()

const productsRoutes = Router()
const upload = multer(uploadConfig.MULTER)

productsRoutes.use(ensureAuthenticated)

productsRoutes.post('/', adminVerification,productsController.create)
productsRoutes.put('/:id', adminVerification,productsController.update)
productsRoutes.get('/', productsController.index)
productsRoutes.get('/:id', productsController.show)
productsRoutes.delete('/:id', adminVerification,productsController.delete)
productsRoutes.patch("/picture/:id", adminVerification, upload.single("picture"), productsPictureController.update)


module.exports = productsRoutes
