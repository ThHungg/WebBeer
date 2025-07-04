const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

router.post('/createProduct', upload.array('images', 5), productController.createProduct)

router.get('/getAllProduct', productController.getAllProduct)
router.get('/getDetailProduct/:id', productController.getDetailProduct)
router.get('/getRandomproduct', productController.getRandomProduct)

router.put('/updateProduct/:id', upload.array('images', 5), productController.updateProduct)

router.delete('/deleteProduct/:id', productController.deleteProduct)

module.exports = router