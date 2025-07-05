const newsService = require('../services/newsService')

const createNews = async (req, res) => {
    try {
        const { title, summary, author } = req.body
        let { mainImageUrl, sections } = req.body

        if (typeof sections === 'string') {
            try {
                sections = JSON.parse(sections)
            } catch (e) {
                return res.status(400).json({ status: 'Err', message: 'Sections không đúng định dạng JSON' })
            }
        }
        // if (!req.file?.mainImageUrl || req.files.mainImageUrl.length !== 1) {
        //     return res.status(400).json({
        //         status: "Err",
        //         message: "Vui lòng tải lên 1 ảnh làm ảnh chính"
        //     })
        // }

        const mainImgFiles = req.files['mainImageUrl']
        if (mainImgFiles && mainImgFiles.length > 0) {
            mainImageUrl = `/upload/${mainImgFiles[0].filename}`
        }

        if (req.files?.sectionImages) {
            const sectionImages = req.files['sectionImages']
            sections = sections.map((section, idx) => {
                if (sectionImages[idx]) {
                    section.imageUrl = `/upload/${sectionImages[idx].filename}`
                }
                return section
            })
        }

        const data = { title, mainImageUrl, summary, sections, author }
        const response = await newsService.createNews(data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({ message: "Lỗi hệ thống, vui lòng thử lại sau!" });
    }
}

module.exports = {
    createNews
}