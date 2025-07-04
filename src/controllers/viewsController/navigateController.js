const navigateService = require('../../services/viewsService/navigateService')

const createNavigate = async (req, res) => {
    try {
        const { title, description, navigate } = req.body
        const naviData = {
            title, description, navigate
        }
        const response = await navigateService.createNavigate(naviData)
        return res.status(200).json(response)
    } catch (e) {
        res.status(500).json({
            message: 'Lỗi hệ thống, vui lòng thử lại sau!',
        });
    }
}

const getNavigate = async (req, res) => {
    try {
        const response = await navigateService.getNavigate()
        return res.status(200).json(response)
    } catch (e) {
        res.status(500).json({ status: "Err", message: "Lỗi hệ thống" });
    }
}


module.exports = {
    createNavigate,
    getNavigate
}