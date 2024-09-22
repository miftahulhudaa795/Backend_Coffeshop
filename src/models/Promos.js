const { DataTypes } = require("sequelize");
const db = require("../config/db");


const Promos = db.define("Promos", {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement :true,
        allowNull : false,
        primaryKey : true
    },
    productName : {
        type : DataTypes.STRING
    },
    image : {
        type : DataTypes.STRING
    },
    description : {
        type : DataTypes.STRING
    },
    couponCode : {
        type : DataTypes.STRING
    },
    date : {
        type : DataTypes.STRING
    }
});

module.exports = Promos
