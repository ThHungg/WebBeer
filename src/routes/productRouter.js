const express = require('express')
const router = express.Router()
const productController = require('../controllers/producrController')
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

router.post('/createProduct', upload.array('image', 5), productController.createProduct)

router.get('/getAllProduct', productController.getAllProduct)
router.get('/getDetailProduct/:id', productController.getDetailProduct)

router.delete('/deleteProduct/:id', productController.deleteProduct)

module.exports = router