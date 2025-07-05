const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contactController')

router.post('/sendContact', contactController.sendContact)

module.exports = router