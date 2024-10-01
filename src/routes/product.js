const { createProduct, findAllProduct, findOneProduct, updateProduct, deleteProduct } = require('../controllers/product')
const upload = require('../middleware/upload')
const { verifyToken, verifyAdmin } = require('../middleware/verifyToken')


const productRouter = require('express').Router()


productRouter.post(`/`, verifyAdmin, upload.single('image'), createProduct)
productRouter.get(`/`, findAllProduct)
productRouter.get(`/:id`, findOneProduct)
productRouter.patch(`/:id`, verifyAdmin, upload.single('image'), updateProduct)
productRouter.delete(`/:id`, verifyAdmin, deleteProduct)


module.exports = productRouter