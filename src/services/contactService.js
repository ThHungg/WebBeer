const Contact = require('../models/Contact');
const dayjs = require('dayjs');
const { JWT } = require('google-auth-library');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const SHEET_ID = process.env.SHEET_ID;
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');

const sendContact = async (data) => {
    // Lưu MongoDB
    const contact = new Contact(data);
    await contact.save();

    // Tạo JWT client
    const jwtClient = new JWT({
        email: CLIENT_EMAIL,
        key: PRIVATE_KEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Khởi tạo GoogleSpreadsheet với client auth
    const doc = new GoogleSpreadsheet(SHEET_ID, jwtClient);

    // Load thông tin sheet
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0]; // Lấy sheet đầu tiên

    const formattedDate = dayjs(contact.createdAt).format('HH:mm DD/MM/YYYY');

    await sheet.addRow({
        "Tên khách hàng": contact.name,
        Email: contact.email,
        "Số điện thoại": contact.phone,
        "Tiêu đề": contact.subject,
        "Nội dung": contact.message,
        "Thời gian gửi": formattedDate,
    });

    return contact;
};

module.exports = { sendContact };
