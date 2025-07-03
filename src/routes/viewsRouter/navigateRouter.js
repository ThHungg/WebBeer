const express = require('express')
const router = express.Router()
const navigateController = require('../../controllers/viewsController/navigateController')
const { authMiddleware, roleMiddleware } = require('../../middleware/authMiddleware')

router.post('/createNavigate',authMiddleware, roleMiddleware(['admin']) , navigateController.createNavigate)
router.get('/getNavigate', navigateController.getNavigate)

module.exports = router