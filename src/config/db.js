const {config} = require('dotenv')
config()
const { Sequelize } = require("sequelize");
const pg = require('pg')


const db = new Sequelize(`${process.env.DATABASE_URL}`, {
    dialect : 'postgres',
    dialectModule : pg
})

module.exports = db