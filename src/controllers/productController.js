const productService = require('../services/productService')
const fs = require("fs");
const path = require("path");
const Product = require('../models/Product')
// const createProduct = async (req, res) => {
//     try {
//         const { name, priceType, price, description, category, specifications } = req.body
//         if (!name || !priceType || !price || !description || !category || !specifications) {
//             return res.status(400).json({
//                 status: "Err",
//                 message: "Vui lòng nhập đầy đủ thông tin"
//             })
//         }

//         const productData = {
//             name, priceType, price, description, category, specifications: JSON.parse(specifications), image: []
//         }

//         let uploadPromise = Promise.resolve([])

//         if (req.files && req.files.length > 0) {
//             const fileBuffers = req.files.map(file => file.buffer)
//             uploadPromise = uploadMultiBuffers(fileBuffers, 'WebBeerImg/products')
//         }

//         const response = await productService.createProduct(productData)
//         uploadPromise.then(async (imgUrls) => {
//             if (imgUrls.length > 0 && response?.data?._id) {
//                 await productService.updateProductImage(response.data._id, imgUrls)
//             }
//         }).catch(e => console.error('Lỗi upload ảnh:', e))

//         return res.status(200).json(response)
//     } catch (e) {
//         console.log(e)
//         res.status(404).json({
//             message: "Lỗi hệ thống vui lòng thử lại sau!"
//         })
//     }
// }

// const createProduct = async (req, res) => {
//     try {
//         const { name, priceType, price, description, category, specifications } = req.body
//         if (!name || !priceType || !price || !description || !category || !specifications) {
//             return res.status(400).json({
//                 status: "Err",
//                 message: "Vui lòng nhập đầy đủ thông tin"
//             })
//         }

//         const productData = {
//             name,
//             priceType,
//             price,
//             description,
//             category,
//             specifications: JSON.parse(specifications),
//             image: []
//         }

//         // Bắt đầu upload ảnh (Promise chưa await)
//         let uploadPromise = Promise.resolve([])
//         if (req.files && req.files.length > 0) {
//             const fileBuffers = req.files.map(file => file.buffer)
//             uploadPromise = uploadMultiBuffers(fileBuffers, 'WebBeerImg/products')
//         }

//         // Tạo sản phẩm (await)
//         const response = await productService.createProduct(productData)

//         // Trả ngay kết quả tạo sản phẩm về client
//         res.status(response.status === 'Ok' ? 200 : 400).json(response)

//         // Bắt đầu xử lý upload ảnh và cập nhật ảnh cho sản phẩm ở background, không chờ
//         uploadPromise.then(async (imgUrls) => {
//             if (response.status !== 'Ok') {
//                 // Nếu tạo sản phẩm lỗi mà ảnh vẫn upload xong thì xóa ảnh
//                 await Promise.all(
//                     imgUrls.map(url => cloudinary.uploader.destroy(getPublicIdFromUrl(url)))
//                 )
//             } else if (imgUrls.length > 0 && response?.data?._id) {
//                 // Nếu thành công thì cập nhật ảnh
//                 await productService.updateProductImage(response.data._id, imgUrls)
//             }
//         }).catch(e => {
//             console.error('Lỗi upload ảnh và cập nhật:', e)
//         })

//     } catch (e) {
//         console.error(e)
//         res.status(500).json({
//             message: "Lỗi hệ thống, vui lòng thử lại sau!"
//         })
//     }
// }

// const createProduct = async (req, res) => {
//     try {
//         const { name, priceType, price, description, category, specifications } = req.body
//         if (!name || !priceType || !price || !description || !category || !specifications) {
//             return res.status(400).json({
//                 status: "Err",
//                 message: "Vui lòng nhập đầy đủ thông tin"
//             })
//         }

//         const productData = {
//             name,
//             priceType,
//             price,
//             description,
//             category,
//             specifications: JSON.parse(specifications),
//             image: []
//         }

//         // Bắt đầu upload ảnh (Promise chưa await)
//         let uploadPromise = Promise.resolve([])
//         if (req.files && req.files.length > 0) {
//             const fileBuffers = req.files.map(file => file.buffer)
//             uploadPromise = uploadMultiBuffers(fileBuffers, 'WebBeerImg/products')
//         }

//         // Tạo sản phẩm (await)
//         const response = await productService.createProduct(productData)

//         // Trả kết quả tạo sản phẩm ngay, dù lỗi hay thành công
//         res.status(response.status === 'Ok' ? 200 : 400).json(response)

//         // Xử lý upload ảnh & cập nhật hoặc xóa ảnh dựa vào response.status
//         uploadPromise.then(async (imgUrls) => {
//             if (response.status !== 'Ok') {
//                 // Nếu tạo sản phẩm lỗi, xóa ảnh đã upload
//                 await Promise.all(
//                     imgUrls.map(url => cloudinary.uploader.destroy(getPublicIdFromUrl(url)))
//                 )
//             } else if (imgUrls.length > 0 && response?.data?._id) {
//                 // Nếu tạo sản phẩm thành công, cập nhật ảnh cho sản phẩm
//                 await productService.updateProductImage(response.data._id, imgUrls)
//             }
//         }).catch(e => {
//             console.error('Lỗi upload ảnh hoặc xử lý ảnh:', e)
//         })

//     } catch (e) {
//         console.error(e)
//         res.status(500).json({
//             message: "Lỗi hệ thống, vui lòng thử lại sau!"
//         })
//     }
// }

const createProduct = async (req, res) => {
    try {
        let { name, priceType, price, description, specifications } = req.body;

        // Loại bỏ khoảng trắng đầu cuối
        if (priceType) priceType = priceType.trim();
        if (name) name = name.trim();
        if (description) description = description.trim();

        if (!name || !priceType || !description || !specifications) {
            return res.status(400).json({
                status: "Err",
                message: "Vui lòng nhập đầy đủ thông tin"
            });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                status: "Err",
                message: "Vui lòng tải lên ít nhất một ảnh"
            });
        }

        const images = req.files.map(file => `/uploads/${file.filename}`);

        if (typeof specifications === "string") {
            try {
                specifications = JSON.parse(specifications);
            } catch {
                return res.status(400).json({
                    status: "Err",
                    message: "Specifications không đúng định dạng JSON"
                });
            }
        }

        const productData = {
            name,
            priceType,
            price,
            description,
            specifications,
            image: images
        };

        const response = await productService.createProduct(productData);

        return res.status(200).json(response);

    } catch (e) {
        return res.status(500).json({
            status: "Err",
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        let { name, priceType, price, description, specifications } = req.body;

        if (!productId) {
            return res.status(400).json({ status: "Err", message: "Thiếu ID sản phẩm" });
        }

        if (name) name = name.trim();
        if (priceType) priceType = priceType.trim();
        if (description) description = description.trim();

        if (typeof specifications === "string") {
            try {
                specifications = JSON.parse(specifications);
            } catch {
                return res.status(400).json({ status: "Err", message: "Specifications không đúng định dạng JSON" });
            }
        }


        if (typeof description === 'string') {
            // Nếu frontend gửi 1 đoạn duy nhất
            description = [description];
        } else if (!Array.isArray(description)) {
            return res.status(400).json({ status: "Err", message: "description phải là mảng hoặc chuỗi" });
        }

        let newImages = null;
        if (req.files && req.files.length > 0) {
            const product = await Product.findById(productId);
            if (product?.image?.length > 0) {
                product.image.forEach(imgPath => {
                    const fullPath = path.join(__dirname, "../../public", imgPath);
                    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
                });
            }
            newImages = req.files.map(file => `/uploads/${file.filename}`);
        }

        // Gọi service, truyền data đã chuẩn bị
        const updateData = { name, priceType, price, description, specifications };
        if (newImages) updateData.image = newImages;

        const response = await productService.updateProduct(productId, updateData);

        return res.status(response.status === "Ok" ? 200 : 400).json(response);
    } catch (e) {
        return res.status(500).json({ status: "Err", message: "Lỗi hệ thống, vui lòng thử lại sau!" });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                status: "Err",
                message: "Không tìm thấy sản phẩm"
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                status: "Err",
                message: "Sản phẩm không tồn tại"
            });
        }

        // Xóa ảnh khỏi server
        product.image.forEach(imgPath => {
            const fullPath = path.join(__dirname, "../../public", imgPath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        });

        const response = await productService.deleteProduct(productId);
        return res.status(200).json(response);
    } catch (e) {
        res.status(500).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0;
        const page = parseInt(req.query.page) || 0;
        const response = await productService.getAllProduct(page, limit)
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}

const getRandomProduct = async (req, res) => {
    try {
        const response = await productService.getRandomProduct()
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}

const getDetailProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(400).json({
                status: "Err",
                message: "Không tìm thấy sản phẩm"
            })
        }
        const response = await productService.getDetailProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    getAllProduct,
    getDetailProduct,
    updateProduct,
    getRandomProduct
}


// if (req.files && req.files.length > 0) {
//     productData.image = req.files.map(file => file.path)
// }
