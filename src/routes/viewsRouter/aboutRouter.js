const express = require('express')
const router = express.Router()
const aboutController = require('../../controllers/viewsController/aboutController')
const { authMiddleware, roleMiddleware } = require('../../middleware/authMiddleware')

router.post('/createAbout', authMiddleware, roleMiddleware(['admin']), aboutController.createAbout)
router.get('/getAbout', aboutController.getAbout)

module.exports = router