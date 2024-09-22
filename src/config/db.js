const { Sequelize } = require("sequelize");



const db = new Sequelize('coffeeshop', 'postgres', '100696', {
    dialect : 'postgres',
    port : 5432
})

module.exports = db