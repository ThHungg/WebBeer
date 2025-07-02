const express = require('express')
const router = express.Router()
const navigateController = require('../../controllers/viewsController/navigateController')

router.post('/createNavigate', navigateController.createNavigate)

module.exports = router