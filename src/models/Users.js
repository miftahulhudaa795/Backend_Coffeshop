const { DataTypes } = require("sequelize");
const db = require("../config/db");



const Users = db.define ('Users', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement :true,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING,
        
    },
    password : {
        type : DataTypes.STRING
    },
    phoneNumber : {
        type : DataTypes.STRING
    },
    image : {
        type : DataTypes.STRING,
        defaultValue : ""
    },
    address : {
        type : DataTypes.STRING
    },
    role : {
        type : DataTypes.STRING
    } 
}, {
    timestamps : true
})

module.exports = Users