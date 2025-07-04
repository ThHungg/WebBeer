const express = require('express');
const router = express.Router();
const upload = require('../../middleware/upload');
const homePageController = require('../../controllers/viewsController/homepageController');

// Multer middleware (chỉnh theo fieldnames bạn dùng)
router.post('/createHomePage', upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'sectionImages' },
    { name: 'carouselImages' }
]), homePageController.createHomePage);

router.put('/updateHomePage', upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'sectionImages' },
    { name: 'carouselImages' }
]), homePageController.updateHomePage);

router.delete('/deleteHomePage', homePageController.deleteHomePage);
router.get('/getHomePage', homePageController.getHomePage);

module.exports = router;
