const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Users = sequelize.define('user', {
    id: {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false, 
        primaryKey: true
    }, 
    name : Sequelize.STRING,
    email : Sequelize.STRING
});

module.exports = Users;