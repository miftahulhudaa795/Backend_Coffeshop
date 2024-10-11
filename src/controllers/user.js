
const { Op } = require("sequelize")
const Users = require("../models/Users")



// Create User
const createUser = async (req, res) => {
    try {
        const {name, email, password, phoneNumber, address} = req.body
        const file = req.file ? req.file?.path : null;
        const data = await Users.create ({
            name,
            email,
            password,
            phoneNumber,
            address,
            image : file
        })
        res.status (201).json({
            msg : 'Success Create User', data
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg : 'Failed Create User', error
        })
        
    }
}

// Read All User
const readAllUser = async (req, res) => {
    const {search, orderBy, sortBy, limit, page} = req.query
    const offset = (page - 1) * limit
    let where = {}
    let order = []

    if (search) {
        where = {
            email : { [Op.iLike]: "%" + search + "%" }
        }
    }
    if (orderBy && sortBy) {
        order = [[orderBy, `${sortBy}`]];
    }
    try {
        const data = await Users.findAll({
            where,
            order,
            limit,
            offset
        })
        res.status(200).json({
            msg : 'Success find all Users',
            data
        })
    } catch (error) {
        console.log({error});
        res.status(500).json(error)
    }
}

// Read One User
const readOneUser = async (req, res) => {
    try {
        const {id} = req.payload
        const dataUser = await Users.findByPk(id)
        if (!dataUser){
            return res.status(404).json({msg : `User Not Found`, dataUser})
        }
        res.status(200).json({
            msg : 'Succes',
            dataUser
        })
    } catch (error) {
        console.log({error});
        res.status(500).json(error)
    }
}

// Update User
const updateUser = async (req, res) => {
    try {
        const {id} = req.params
        const {name, email, password, phoneNumber, address} = req.body
        const user = await Users.findByPk(id)
        if (!user){
            return res.status(404).json({msg : `User Not Found`})
        }
        if (req.file) {
            await user.update({
                name,
                email,
                password,
                phoneNumber,
                address,
                image : req?.file?.path
            })
            return res.status(200).json({
                msg :'Success Update User with image',
                data : user
            })
        }
        await user.update({name, email, password, phoneNumber, address})
        await user.save()
        res.status(200).json({
            msg : 'Success Update User',
            data : user
        })
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

// Delete User
const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await Users.findByPk(id)
        if (!user){
            return res.status(404).json({msg : `User Not Found`})
        }
        await user.destroy()
        await user.save()
        res.status(200).json ({
            msg : 'Success Delete User'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}



module.exports = {
    createUser,
    readAllUser,
    readOneUser,
    updateUser,
    deleteUser
}