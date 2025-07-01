const HomePage = require('../../models/HomePage');

const createDataHP = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const homePage = await HomePage.findOne();
            if (homePage) {
                homePage.banner = data.banner;
                homePage.sections = data.sections;
                homePage.carouselImages = data.carouselImages
                const updated = await homePage.save();
                resolve({
                    status: "Ok",
                    message: "Cập nhật thành công",
                    data: updated
                });
            } else {
                const newHomePage = new HomePage(data);
                const saved = await newHomePage.save();
                resolve({
                    status: "Ok",
                    message: "Tạo mới thành công",
                    data: saved
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createDataHP
};
