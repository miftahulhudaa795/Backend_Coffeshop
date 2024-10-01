const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    try {
        const {username, email, password : userPassword} = req.body
        const salt = await bcrypt.genSalt()
        const encryptPassword = await bcrypt.hash(userPassword, salt)
        const data = await Users.create ({
            username,
            email,
            password : encryptPassword,
            role : 'user'
        })
        res.status(201).json({msg : 'Success Register User'})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : 'Internal Server Error', error})
        
    }
}

const login = async (req, res) =>{
    try {
        const {email, password} = req.body
        const user =await Users.findOne({where : {email}})

        // cek user apakah ada di database apa tidak
        if (!user) {
            return res.status(404).json({msg : 'User Not Found'})
        }
        
        const userPassword = user.getDataValue('password')

        // bandingkan password dari user dengan password yang di database
        const match = await bcrypt.compare(password, userPassword)
        if (!match) {
            return res.status(404).json({msg : 'Wrong Email or Password'})
        }
        const token = jwt.sign({email, id : user.getDataValue('id'), role : user.getDataValue('role')}, process.env.SECRET_KEY, {
            expiresIn : '1d'
        })
        res.status(200).json({msg : 'Login Success', token})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : 'Internal Server Error', error})
    }
}

module.exports = {
    register,
    login
} 
