const { createProduct, findAllProduct, findOneProduct, updateProduct, deleteProduct } = require('../controllers/product')
const upload = require('../middleware/upload')

const productRouter = require('express').Router()


productRouter.post(`/`, upload.single('image'), createProduct)
productRouter.get(`/`, findAllProduct)
productRouter.get(`/:id`, findOneProduct)
productRouter.patch(`/:id`, upload.single('image'), updateProduct)
productRouter.delete(`/:id`, deleteProduct)


module.exports = productRouter