const contactService = require('../services/contactService')

const sendContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({
                status: "Err",
                message: "Vui lòng nhập đầy đủ thông tin."
            });
        }
        const response = await contactService.sendContact(req.body)
        return res.json({
            status: "Ok",
            message: "Gửi liên hệ thành công",
            data: response,
        });
    } catch (e) {
        res.status(500).json({
            message: 'Lỗi hệ thống, vui lòng thử lại sau!',
        });
    }
}

module.exports = {
    sendContact
}