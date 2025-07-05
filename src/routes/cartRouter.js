const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

router.post('/createCart', cartController.createCart)
router.delete('/removeItem', cartController.removeItem)
router.put('/updateCart', cartController.updateCart)

router.get('/getCart/:userId', cartController.getCart)



module.exports = router