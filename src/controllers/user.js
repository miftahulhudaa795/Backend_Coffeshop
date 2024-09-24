
const { Op } = require("sequelize")
const Users = require("../models/Users")



// Create User
const createUser = async (req, res) => {
    try {
        const {username, email, password} = req.body
        const data = await Users.create ({
            username,
            email,
            password
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
            username : { [Op.iLike]: "%" + search + "%" }
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
        const {id} = req.params
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
        const {username, email, password} = req.body
        const user = await Users.findByPk(id)
        if (!user){
            return res.status(404).json({msg : `User Not Found`})
        }
        await user.update({username, email, password})
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