const { Op } = require("sequelize")
const Promos = require("../models/Promos")



// Create Promo
const createPromo = async (req, res) => {
    try {
        const {productName, description, couponCode, date} = req.body
        const image = req.file ? req.file?.path : null

        const data = await Promos.create ({
            productName,
            image,
            description,
            couponCode,
            date
        })
        res.status(201).json({
            msg : 'Success Create Promo', data
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : 'Failed Create Promo'
        })
    }
}

// Read All Promo
const readAllPromo = async (req, res) => {
    const {search, orderBy, sortBy, limit, page} = req.query
    const offset = (page - 1) * limit
    let where = {}
    let order =[]
    if (search) {
        where = {
            productName: { [Op.iLike]: "%" + search + "%" }
        }
    }
    if (orderBy && sortBy) {
        order = [[orderBy, `${sortBy}`]]
    }
    try {
        const data = await Promos.findAll({
            where,
            order,
            limit,
            offset
        })
        res.status(201).json({
            msg : 'Success Find All Promo', data
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : 'Failed Find All Promo'
        })
        
    }
}

// Read One Promo
const readOnePromo = async (req, res) => {
    try {
        const {id} = req.params
        const data = await Promos.findByPk(id)
        if (!data) {
            return res.status (400).json({msg : 'Promo Not Found'})
        }
        res.status(201).json({
            msg : 'Success Find One Promo', data
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error})   
    }
}

// Update Promo
const updatePromo = async (req, res) => {
    try {
        const {id} = req.params
        const {productName, description, couponCode, date} = req.body
        const data = await Promos.findByPk(id)
        if (!data) {
            return res.status (400).json({msg :'Promo Not Found'})
        }

        if (req.file) {
            await data.update ({
                productName,
                description,
                couponCode,
                date,
                image : req?.file?.path
            })
            return res.status(200).json({
                msg : 'Success Update Promo With Image', data
            })
        }
        await data.update ({productName, description, couponCode, date})
        await data.save()
        res.status(201).json({
            msg : 'Success Update Promo', data
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({error})
    }
}

// Delete Promo
const deletePromo = async (req, res) => {
    try {
        const {id} = req.params
        const data = await Promos.findByPk(id)
        if (!data){
            return res.status(404).json({msg : `Promo Not Found`})
        }
        await data.destroy()
        await data.save()
        res.status(200).json ({
            msg : 'Success Delete Promo'
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({error})
        
    }
}

module.exports = {
    createPromo,
    readAllPromo,
    readOnePromo,
    updatePromo,
    deletePromo
}
   