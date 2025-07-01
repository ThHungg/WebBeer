const homePageService = require('../../services/viewsService/homePageService');

const createDataHP = async (req, res) => {
    try {
        const { banner, sections, carouselImages } = req.body;

        // let bannerObj = typeof banner === 'string' ? JSON.parse(banner) : banner;
        // if (!bannerObj || !bannerObj.title || !bannerObj.image) {
        //     return res.status(400).json({
        //         status: "Err",
        //         message: "Vui lòng nhập đầy đủ thông tin banner (có ảnh)!"
        //     });
        // }

        // let sectionsObj = [];
        // if (sections) {
        //     sectionsObj = typeof sections === 'string' ? JSON.parse(sections) : sections;
        //     if (sectionsObj.some(sec => !sec.title || !sec.imageUrl)) {
        //         return res.status(400).json({
        //             status: "Err",
        //             message: "Mỗi section phải có title và imageUrl!"
        //         });
        //     }
        // }

        const homePageData = {
            banner,
            sections,
            carouselImages
        };

        const response = await homePageService.createDataHP(homePageData);

        res.status(200).json(response);
    } catch (e) {
        console.error('Lỗi hệ thống createDataHP:', e);
        res.status(500).json({ status: "Err", message: "Lỗi hệ thống" });
    }
};

module.exports = {
    createDataHP
};
