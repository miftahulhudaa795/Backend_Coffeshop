const { DataTypes } = require('sequelize');
const db = require("../config/db");

const Products = db.define('Product', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement :true,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING
    },
    stock : {
        type :DataTypes.INTEGER
    },
    category : {
        type : DataTypes.STRING
    },
    image : {
        type : DataTypes.STRING
    },
    price : {
        type : DataTypes.INTEGER
    },
    description : {
        type : DataTypes.STRING
    },
    size : {
        type : DataTypes.STRING
    }
}, {
    timestamps : true
}) 

module.exports = Products