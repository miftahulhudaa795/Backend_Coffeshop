
const authRouter = require('./auth')
const productRouter = require('./product')
const promoRouter = require('./promo')
const transactionRouter = require('./transaction')
const userRouter = require('./user')

const routes = require('express').Router()


routes.use('/product', productRouter)
routes.use('/user', userRouter)
routes.use('/auth', authRouter)
routes.use('/transaction', transactionRouter )
routes.use('/promo', promoRouter)

module.exports = routes