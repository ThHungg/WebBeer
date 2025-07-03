const express = require('express')
const router = express.Router()
const productController = require('../controllers/producrController')
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

router.post('/createProduct', upload.array('image', 5), authMiddleware, roleMiddleware(['admin']), productController.createProduct)

router.get('/getAllProduct', authMiddleware, roleMiddleware(['admin']), productController.getAllProduct)
router.get('/getDetailProduct/:id', productController.getDetailProduct)

router.put('/updateProduct/:id', authMiddleware, roleMiddleware(['admin']), productController.updateProduct)

router.delete('/deleteProduct/:id', authMiddleware, roleMiddleware(['admin']), productController.deleteProduct)

module.exports = router