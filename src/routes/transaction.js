const { createTransaction, updateTransaction, deleteTransaction, findAllTransaction, findOneTransaction } = require('../controllers/transaction')
const { verifyToken } = require('../middleware/verifyToken')



const transactionRouter = require('express').Router()


transactionRouter.post (`/`, verifyToken, createTransaction)
transactionRouter.get (`/`, findAllTransaction)
transactionRouter.get (`/:id`, findOneTransaction)
transactionRouter.patch (`/:id`, updateTransaction)
transactionRouter.delete (`/:id`, deleteTransaction)

module.exports = transactionRouter