const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const genneralAccessToken = (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '10s' })
    return access_token
}

const genneralRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
    return refresh_token
}

// const refreshTokenJwtService = (token) => {
//     return new Promise((resolve, reject) => {
//         try {
//             jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
//                 if (err) {
//                     return resolve({
//                         status: "Err",
//                         message: "Xác thực không thành công"
//                     })
//                 }
//                 const access_token = await genneralAccessToken({
//                     id: user?.id,
//                     role: user?.role
//                 })

//                 resolve({
//                     status: "Ok",
//                     message: "Thành công",
//                     access_token
//                 })
//                 console.log('refreshToken', user)
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }


const refreshTokenJwtService = async (token) => {
    try {
        const user = await jwtVerify(token, process.env.REFRESH_TOKEN);
        const access_token = await genneralAccessToken({
            id: user?.id,
            role: user?.role
        });
        return {
            status: "Ok",
            message: "Thành công",
            access_token
        };
    } catch (err) {
        return {
            status: "Err",
            message: "Xác thực không thành công"
        };
    }
};
module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}