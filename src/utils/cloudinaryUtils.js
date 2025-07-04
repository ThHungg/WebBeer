// const cloudinary = require('../config/cloudinaryConfig')

// function getPublicIdFromUrl(url) {
//     const parts = url.split('/upload/')
//     if (parts.length < 2) return null

//     const fullPath = parts[1]

//     const withoutVersion = fullPath.includes('/')
//         ? fullPath.substring(fullPath.indexOf('/') + 1)
//         : fullPath

//     const publicId = withoutVersion.split('.').slice(0, -1).join('.')

//     return publicId
// }

// const cloudinary = require('cloudinary').v2;

// async function deleteDuplicateImages(imageUrls) {
//     const seen = new Set();
//     for (const url of imageUrls) {
//         const publicId = getPublicIdFromUrl(url); // Hàm bạn tự viết lấy publicId từ URL
//         if (!seen.has(publicId)) {
//             seen.add(publicId);
//         } else {
//             // Đã tồn tại, xóa ảnh này
//             await cloudinary.uploader.destroy(publicId);
//             console.log(`Đã xóa ảnh trùng: ${publicId}`);
//         }
//     }
// }



// const uploadImgBuffer = (fileBuffer, folder = 'WebBeerImg') => {
//     return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//             { folder },
//             (error, result) => {
//                 if (error) { return reject(error) }
//                 resolve(result.secure_url)
//             }
//         )
//         stream.end(fileBuffer)
//     })
// }

// const uploadMultiBuffers = async (fileBuffers, folder = 'WebBeerImg') => {
//     if (!fileBuffers || fileBuffers.length === 0) return []
//     return await Promise.all(fileBuffers.map(buffer => uploadImgBuffer(buffer, folder)))
// }

// module.exports = { getPublicIdFromUrl, uploadImgBuffer, uploadMultiBuffers }