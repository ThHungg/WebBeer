// const cloudinary = require('../config/cloudinaryConfig')

// const uploadImages = async (req, res) => {
//     try {
//         const images = req.files.map((file) => file.path)
//         const uploadImages = []
//         for (let image of images) {
//             const results = await cloudinary.uploader.upload(image)
//             console.log('Result: ', results)
//             uploadImages.push({
//                 url: results.secure_url,
//                 publicId: results.public_id
//             })
//         }
//         return res.status(200).json({
//             message: "Upload images successfully!",
//             datas: uploadImages
//         })
//     } catch (e) {
//         console.log(e)
//         res.status(404).json({
//             message: "Lỗi hệ thống vui lòng thử lại sau!"
//         })
//     }
// }

// module.exports = {
//     uploadImages
// }

const cloudinary = require('../config/cloudinaryConfig');

const uploadImages = async (req, res) => {
    try {
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({
                message: 'Không có ảnh nào được upload!',
            });
        }

        const uploadResults = [];

        for (const file of files) {
            const streamUpload = () => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: 'WebBeerImg/common' },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve({
                                url: result.secure_url,
                                publicId: result.public_id,
                            });
                        }
                    );
                    stream.end(file.buffer); 
                });
            };

            const result = await streamUpload();
            uploadResults.push(result);
        }

        return res.status(200).json({
            message: 'Upload ảnh thành công!',
            datas: uploadResults,
        });
    } catch (e) {
        console.error('Upload error:', e);
        res.status(500).json({
            message: 'Lỗi hệ thống, vui lòng thử lại sau!',
        });
    }
};

module.exports = {
    uploadImages,
};
