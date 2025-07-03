const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

router.post('/createCart', cartController.createCart)
router.post('/removeItem', cartController.removeItem)
router.post('/updateCart', cartController.updateCart)

router.get('/getCart/:userId', cartController.getCart)



module.exports = router