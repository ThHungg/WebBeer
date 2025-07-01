const About = require('../../models/About')

const createAbout = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const aboutPage = await About.findOne()
            if (aboutPage) {
                aboutPage.banner = data.banner
                aboutPage.description = data.description
                aboutPage.carouselImages = data.carouselImages
                aboutPage.estDate = data.estDate
                const updated = await aboutPage.save()
                resolve({
                    status: "Ok",
                    message: "Cập nhật thành công",
                    data: updated
                })
            } else {
                const newAbout = new About(data)
                const saved = await newAbout.save()
                resolve({
                    status: "Ok",
                    message: "Tạo mới thành công",
                    data: saved
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createAbout
}