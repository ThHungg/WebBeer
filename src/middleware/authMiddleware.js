const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

// const authMiddleware = (req, res, next) => {
//     try {
//         const token = req.headers.token.split(' ')[1]
//         jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
//             if (err) {
//                 return res.status(400).json({
//                     status: 'Err',
//                     message: "Token không hợp lệ hoặc hết hạn"
//                 })
//             }
//             req.user = user;
//             next()
//         })
//     } catch (e) {
//         console.log(e)
//         return res.status(404).json({
//             status: "Err",
//             message: "Lỗi hệ thống vui lòng thử lại sau!"
//         })
//     }
// }

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.token;
        if (!authHeader) {
            return res.status(401).json({ status: "Err", message: "Không có token" });
        }

        // Token có thể dạng "Bearer xxxxx"
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ status: "Err", message: "Token sai định dạng" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; // gán thông tin user decoded cho request
        next();
    } catch (error) {
        return res.status(401).json({ status: "Err", message: "Token không hợp lệ hoặc hết hạn" });
    }
};
const roleMiddleware = (allowedRole) => {
    return (req, res, next) => {
        userRole = req.user?.role;

        if (!userRole || !allowedRole.includes(userRole)) {
            return res.status(400).json({
                status: "Err",
                message: "Bạn không có quyền truy cập!"
            })
        }
        next()
    }
}

module.exports = {
    authMiddleware,
    roleMiddleware
}
