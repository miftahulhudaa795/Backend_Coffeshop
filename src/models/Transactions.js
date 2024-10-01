const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Users = require("./Users");
const Products = require("./Products");




const Transactions = db.define('Transactions', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement :true,
        allowNull : false,
        primaryKey : true
    },
    user_id : {
        type : DataTypes.INTEGER
    },
    product_id : {
        type : DataTypes.INTEGER
    },
    payment_method : {
        type : DataTypes.INTEGER
    },
    delivery_cost : {
        type : DataTypes.INTEGER
    },
    amount : {
        type : DataTypes.INTEGER
    },
    status : {
        type : DataTypes.STRING
    }
}, {
    timestamps : true
})


module.exports = Transactions


Transactions.belongsTo(Users, {foreignKey : 'user_id', as : 'user'})
Transactions.belongsTo(Products, {foreignKey : 'product_id', as : 'product'})
Users.hasMany(Transactions, {foreignKey : 'id'})
Products.hasMany(Transactions, {foreignKey : 'id'})