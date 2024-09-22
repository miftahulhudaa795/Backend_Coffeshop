const { createTransaction, readAllTransaction, readOneTransaction, updateTransaction, deleteTransaction } = require('../controllers/transaction')



const transactionRouter = require('express').Router()


transactionRouter.post (`/`, createTransaction)
transactionRouter.get (`/`, readAllTransaction)
transactionRouter.get (`/:id`, readOneTransaction)
transactionRouter.patch (`/:id`, updateTransaction)
transactionRouter.delete (`/:id`, deleteTransaction)

module.exports = transactionRouter