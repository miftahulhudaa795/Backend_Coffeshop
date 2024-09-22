const { DataTypes } = require("sequelize");
const db = require("../config/db");




const Transactions = db.define('Transactions', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement :true,
        allowNull : false,
        primaryKey : true
    },
    productName : {
        type : DataTypes.STRING
    },
    unitPrice : {
        type : DataTypes.INTEGER
    },
    quantity : {
        type : DataTypes.INTEGER
    },
    subtotal : {
        type : DataTypes.INTEGER
    },
    taxAndFees : {
        type : DataTypes.INTEGER
    },
    total : {
        type : DataTypes.INTEGER
    },
    addressDetails : {
        type : DataTypes.STRING
    },
    paymentMethod : {
        type : DataTypes.STRING
    }
}, {
    timestamps : true
})


module.exports = Transactions