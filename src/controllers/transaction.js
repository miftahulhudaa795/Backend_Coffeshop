const { Op } = require("sequelize")
const Transactions = require("../models/Transactions")



// Create Transaction
const createTransaction = async (req, res) => {
    try {
        const {productName, unitPrice, quantity, subtotal, taxAndFees, total, addressDetails, paymentMethod} = req.body
        const data = await Transactions.create ({
            productName,
            unitPrice,
            quantity,
            subtotal,
            taxAndFees,
            total,
            addressDetails,
            paymentMethod
        })
        res.status(201).json({
            msg : 'Success Create Transaction', data
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg : 'Failed Create Transaction'
        })
        
    }
}

// // Read All Transaction
const readAllTransaction = async (req, res) => {
    const {search, orderBy, sortBy, limit, page} = req.query
    const offset = (page - 1) * limit
    let where = {}
    let order = []

    if (search) {
        where = {
            productName : { [Op.iLike]: "%" + search + "%" }
        }
    }
    if (orderBy && sortBy) {
        order = [[orderBy, `${sortBy}`]];
    }

    try {
        const data = await Transactions.findAll({
            where,
            order,
            limit,
            offset
        })
        res.status(200).json({
            msg : 'Success find all Transactions',
            data
        })
    } catch (error) {
        console.log({error});
        res.status(500).json(error)
    }
}

// // Read One Transaction
const readOneTransaction = async (req, res) => {
    try {
        const {id} = req.params
        const dataTransaction = await Transactions.findByPk(id)
        if (!dataTransaction){
            return res.status(404).json({msg : `Transaction Not Found`, dataTransaction})
        }
        res.status(200).json({
            msg : 'Succes',
            dataTransaction
        })
    } catch (error) {
        console.log({error});
        res.status(500).json(error)
    }
}

// // Update Transaction
const updateTransaction = async (req, res) => {
    try {
        const {id} = req.params
        const {productName, unitPrice, quantity, subtotal, taxAndFees, total, addressDetails, paymentMethod} = req.body
        const transaction = await Transactions.findByPk(id)
        if (!transaction){
            return res.status(404).json({msg : `Transaction Not Found`})
        }
        await transaction.update({productName, unitPrice, quantity, subtotal, taxAndFees, total, addressDetails, paymentMethod})
        await transaction.save()
        res.status(200).json({
            msg : 'Success Update Transaction',
            data : transaction
        })
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

// // Delete Transaction
const deleteTransaction = async (req, res) => {
    try {
        const {id} = req.params
        const transaction = await Transactions.findByPk(id)
        if (!transaction){
            return res.status(404).json({msg : `Transaction Not Found`})
        }
        await transaction.destroy()
        await transaction.save()
        res.status(200).json ({
            msg : 'Success Delete Transaction'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports = {
    createTransaction,
    readAllTransaction,
    readOneTransaction,
    updateTransaction,
    deleteTransaction
}